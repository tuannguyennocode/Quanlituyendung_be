import { Module } from '@nestjs/common';
import { JobPostingService } from './jobposting.service';
import { JobpostingController } from './jobposting.controller';
import { JobPostingSchema } from './jobposting.schema';
import { MongooseModule } from '@nestjs/mongoose';

const JOB_POSTING_MODEL = MongooseModule.forFeature([{ name: 'JobPosting', schema: JobPostingSchema }]);
@Module({
    imports: [JOB_POSTING_MODEL],
    providers: [JobPostingService],
    controllers: [JobpostingController],
    exports: [JobPostingService, JOB_POSTING_MODEL],
})
export class JobPostingModule {}
