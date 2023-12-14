import { Module, forwardRef } from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruitmentSchema } from './recruitment.schema';
import { UserAccountModule } from 'src/user-account/user-account.module';
import { JobPostingModule } from 'src/jobposting/jobposting.module';
import { CompanyModule } from 'src/company/company.module';

const RECRUITMENT_MODEL = MongooseModule.forFeature([{ name: 'Recruitment', schema: RecruitmentSchema }]);
@Module({
    imports: [RECRUITMENT_MODEL, CompanyModule, UserAccountModule, forwardRef(() => JobPostingModule)],
    providers: [RecruitmentService],
    controllers: [RecruitmentController],
    exports: [RecruitmentService, RECRUITMENT_MODEL]
})
export class RecruitmentModule {}
