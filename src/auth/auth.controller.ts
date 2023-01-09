import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('')
  async loginWithGoogle(@Body() loginDto: LoginDto) {
    this.authService.login(loginDto).then(() => {
      return {
        message: 'abc',
      };
    });
  }
}
