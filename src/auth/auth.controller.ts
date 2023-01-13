import { Controller } from '@nestjs/common';
import { Body, Get, Post, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async loginWithGoogle(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserData(@Req() req) {
    return req.user;
  }
}
