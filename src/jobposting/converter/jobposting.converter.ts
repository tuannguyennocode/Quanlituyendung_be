// company-profile.ts
import { Injectable } from '@nestjs/common';
import { ProfileBase, Profile, AutoMapper } from 'nestjsx-automapper';
import { JobPosting } from '../jobposting.schema';
import { JobPostingDto } from '../dto/jobposting.dto';
import { Company } from 'src/company/company.schema';
import { CompanyDto } from 'src/company/dto/companydto';

@Injectable()
export class JobPostingConverter {
    static toDto(jobPosting: JobPosting): JobPostingDto {
        const jobPostingDto = new JobPostingDto();
        jobPostingDto._id = jobPosting._id;
        jobPostingDto.name = jobPosting.name;
        jobPostingDto.detail = jobPosting.detail;
        jobPosting.startDate = jobPosting.startDate;
        jobPosting.endDate = jobPosting.endDate;

        return jobPostingDto;
    }
}
