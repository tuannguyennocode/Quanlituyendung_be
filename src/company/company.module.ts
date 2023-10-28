import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyConverter } from './converter/company.converter';

const COMPANY_MODEL = MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]);
@Module({
    imports: [COMPANY_MODEL],
    providers: [CompanyService, CompanyConverter],
    controllers: [CompanyController],
    exports: [CompanyService, COMPANY_MODEL],
})
export class CompanyModule {}
