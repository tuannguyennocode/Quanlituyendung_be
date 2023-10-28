// company-profile.ts
import { Injectable } from '@nestjs/common';
import { ProfileBase, Profile, AutoMapper } from 'nestjsx-automapper';
import { JobPosting } from '../jobposting.schema';
import { JobPostingDto } from '../dto/jobposting.dto';
import { Company } from 'src/company/company.schema';
import { CompanyDto } from 'src/company/dto/companydto';

@Injectable()
export class CompanyConverter {
    static toDto(company: Company): CompanyDto {
        const companyDto = new CompanyDto();
        companyDto._id = company._id;
        companyDto.name = company.name;
        companyDto.phoneNumber = company.phoneNumber;
        companyDto.email = company.email;
        companyDto.address = company.address;
        companyDto.company_size = company.company_size;
        companyDto.web_url = company.web_url;
        companyDto.description = company.description;

        return companyDto;
    }
}
