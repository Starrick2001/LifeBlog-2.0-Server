import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  @Get()
  async test() {
    return {
      message: 'abc',
    };
  }
}
