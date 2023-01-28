import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import Photo from './entities/post-photo.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    return `This action returns all post`;
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async createPhoto(createPhotoDto: CreatePhotoDto) {
    const post = await this.findOne(createPhotoDto.post);
    if (!post) throw new BadRequestException('Post not found');

    const newPhoto = this.photoRepository.create({
      key: createPhotoDto.key,
      post,
    });
    return await this.photoRepository.save(newPhoto);
  }
}
