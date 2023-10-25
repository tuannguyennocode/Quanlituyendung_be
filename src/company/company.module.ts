import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './company.schema';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from 'src/repository/company.repository';

const COMPANY_MODEL = MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]);
@Module({
    imports: [COMPANY_MODEL],
    providers: [CompanyService,CompanyRepository],
    controllers: [CompanyController],
    exports: [CompanyService, COMPANY_MODEL],
})
export class CompanyModule {}
