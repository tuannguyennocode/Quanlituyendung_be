import { Module, forwardRef } from '@nestjs/common';
import { JobPostingService } from './jobposting.service';
import { JobpostingController } from './jobposting.controller';
import { JobPostingSchema } from './jobposting.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from '../company/company.module';
import { RecruitmentModule } from 'src/recruitment/recruitment.module';

const JOB_POSTING_MODEL = MongooseModule.forFeature([{ name: 'JobPosting', schema: JobPostingSchema }]);
@Module({
    imports: [JOB_POSTING_MODEL, CompanyModule,  RecruitmentModule],
    providers: [JobPostingService],
    controllers: [JobpostingController],
    exports: [JobPostingService, JOB_POSTING_MODEL],
})
export class JobPostingModule {}
