import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    if (!(await this.findUser(loginDto.email))) {
      const newUser = this.userRepository.create(loginDto);
      this.userRepository.save(newUser);
    }
  }

  async findUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
