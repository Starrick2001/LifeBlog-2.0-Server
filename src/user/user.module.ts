import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import Avatar from './entities/avatar.entity';
import { ObjectStorageModule } from 'src/object-storage/object-storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Avatar]), ObjectStorageModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
