import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import jwtDecode from 'jwt-decode';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { UserJwtDecoded } from './interfaces/user-jwtdecoded.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const userProfile: UserJwtDecoded = jwtDecode(loginDto.credential);
    let user = await this.findUser(userProfile.email as string);
    if (!user) {
      const newUser = this.userRepository.create({
        email: userProfile.email,
        name: userProfile.name,
        givenName: userProfile.given_name,
        familyName: userProfile.family_name,
        picture: userProfile.picture,
      });
      user = await this.userRepository.save(newUser);
    }

    const payload: AuthPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      givenName: user.givenName,
      familyName: user.familyName,
      picture: user.picture,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findUser(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
