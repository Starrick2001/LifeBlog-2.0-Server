import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('User not found');
    return user;
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
}
