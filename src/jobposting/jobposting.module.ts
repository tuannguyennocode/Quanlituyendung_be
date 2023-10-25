import { Module } from '@nestjs/common';
import { JobPostingService } from './jobposting.service';
import { JobpostingController } from './jobposting.controller';
import { JobPostingSchema } from './jobposting.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { JobPostingRepository } from 'src/repository/jobposting.repository';

const JOB_POSTING_MODEL = MongooseModule.forFeature([{ name: 'JobPosting', schema: JobPostingSchema }]);
@Module({
    imports: [JOB_POSTING_MODEL, CompanyModule],
    providers: [JobPostingService, JobPostingRepository],
    controllers: [JobpostingController],
    exports: [JobPostingService, JOB_POSTING_MODEL],
})
export class JobPostingModule {}
