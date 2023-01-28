import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  familyName: string;

  @ApiProperty({ required: true })
  @IsString()
  givenName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}
