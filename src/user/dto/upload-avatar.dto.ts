import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadAvatarDto {
  @IsString()
  @ApiProperty({ required: true })
  key: string;

  @IsString()
  @ApiProperty({ required: true })
  owner: string;
}
