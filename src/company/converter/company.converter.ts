// company-profile.ts
import { Injectable } from '@nestjs/common';
import { Company } from '../company.schema';
import { CompanyDto } from '../dto/companydto';

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
        companyDto.jobPostings = company.jobPostings;
        companyDto.avatar_url = company.avatar_url;
        companyDto.review = company.review;
        companyDto.recruitment = company.recruitment;
        return companyDto;
    }
}
