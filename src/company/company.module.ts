import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyConverter } from './converter/company.converter';
import { JobPostingModule } from 'src/jobposting/jobposting.module';

const COMPANY_MODEL = MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]);
@Module({
    imports: [COMPANY_MODEL, forwardRef(() => JobPostingModule)],
    providers: [CompanyService, CompanyConverter],
    controllers: [CompanyController],
    exports: [CompanyService, COMPANY_MODEL, CompanyConverter],
})
export class CompanyModule {}
