import { Test, TestingModule } from '@nestjs/testing';
import { ObjectStorageController } from './object-storage.controller';
import { ObjectStorageService } from './object-storage.service';

describe('ObjectStorageController', () => {
  let controller: ObjectStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectStorageController],
      providers: [ObjectStorageService],
    }).compile();

    controller = module.get<ObjectStorageController>(ObjectStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
