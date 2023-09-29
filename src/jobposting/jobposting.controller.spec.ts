import { Test, TestingModule } from '@nestjs/testing';
import { JobpostingController } from './jobposting.controller';

describe('JobpostingController', () => {
  let controller: JobpostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobpostingController],
    }).compile();

    controller = module.get<JobpostingController>(JobpostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
