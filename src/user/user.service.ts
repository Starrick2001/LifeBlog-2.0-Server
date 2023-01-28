import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Avatar from './entities/avatar.entity';
import { User } from './entities/user.entity';
import { IResponseUser } from './interfaces/user.interface';
import { ObjectStorageService } from 'src/object-storage/object-storage.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Avatar)
    private readonly avatarRepository: Repository<Avatar>,
    @Inject(forwardRef(() => ObjectStorageService))
    private readonly objectStorageService: ObjectStorageService,
  ) {}

  async getUserInfor(email: string): Promise<IResponseUser> {
    const user = await this.userRepository.findOne({
      select: { avatar: { id: true, key: true } },
      relations: { avatar: true },
      where: { email },
    });
    if (!user) throw new BadRequestException('Owner not found');

    //remove some field dont want to send to client

    if (!user.avatar) {
      return await this.removeRedundantField(user);
    }

    const avatarUrl = await this.objectStorageService.getPresignedUrl(
      user.avatar.key,
      'avatar',
    );
    return {
      ...(await this.removeRedundantField(user)),
      picture: avatarUrl,
    };
  }

  async removeRedundantField(user: User): Promise<IResponseUser> {
    const { created_at, deleted_at, updated_at, avatar, ...rest } = user;
    return rest;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      select: { avatar: { id: true, key: true } },
      relations: { avatar: true },
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('User not found');

    return this.userRepository.update(id, {
      name: updateUserDto.givenName + ' ' + updateUserDto.familyName,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  async createAvatar(uploadAvatarDto: UploadAvatarDto, owner: User) {
    // create new avatar
    const newAvatar = this.avatarRepository.create({
      key: uploadAvatarDto.key,
    });
    await this.avatarRepository.save(newAvatar);

    // update user infor
    owner.avatar = newAvatar;
    await this.userRepository.save(owner);
  }

  async updateAvatar(uploadAvatarDto: UploadAvatarDto, owner: User) {
    const avatar = await this.avatarRepository.findOne({
      where: { id: owner.avatar.id },
    });
    if (!avatar) throw new InternalServerErrorException();

    avatar.key = uploadAvatarDto.key;
    this.avatarRepository.save(avatar);
  }

  async uploadAvatar(uploadAvatarDto: UploadAvatarDto) {
    const owner = await this.findOne(uploadAvatarDto.owner);
    if (!owner) throw new BadRequestException('Owner not found');

    if (!owner.avatar) await this.createAvatar(uploadAvatarDto, owner);
    else await this.updateAvatar(uploadAvatarDto, owner);

    return {
      message: 'Upload avatar successful',
    };
  }
}
