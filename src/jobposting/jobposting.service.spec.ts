import { Test, TestingModule } from '@nestjs/testing';
import { JobPostingService } from './jobposting.service';

describe('JobpostingService', () => {
  let service: JobPostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobPostingService],
    }).compile();

    service = module.get<JobPostingService>(JobPostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
