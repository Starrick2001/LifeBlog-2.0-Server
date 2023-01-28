import { Injectable, Logger } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class ObjectStorageService {
  private readonly logger: Logger;

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('ObjectStorageService');
  }

  async getPresignedPutUrl(objectName: string, bucket: string) {
    return await this.minio.client.presignedPutObject(bucket, objectName);
  }

  async getPresignedUrl(objectName: string, bucket: string) {
    return await this.minio.client.presignedGetObject(bucket, objectName);
  }
}
