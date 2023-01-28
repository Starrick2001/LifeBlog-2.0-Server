import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectStorageService } from './object-storage.service';

@Controller('object-storage')
@ApiTags('object-storage')
export class ObjectStorageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Get('/presigned-put-url/:bucket')
  async getPresignedPutUrl(
    @Query('objectName') objectName: string,
    @Param('bucket') bucket: string,
  ) {
    return await this.objectStorageService.getPresignedPutUrl(
      objectName,
      bucket,
    );
  }
}
