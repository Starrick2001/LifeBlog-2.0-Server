import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @ApiProperty({ required: true })
  key: string;

  @IsNumber()
  @ApiProperty({ required: true })
  post: number;
}
