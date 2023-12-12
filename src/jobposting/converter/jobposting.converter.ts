// company-profile.ts
import { Injectable } from '@nestjs/common';
import { JobPosting } from '../jobposting.schema';
import { JobPostingDto } from '../dto/jobposting.dto';

@Injectable()
export class JobPostingConverter {
    static toDto(jobPosting: JobPosting): JobPostingDto {
        const jobPostingDto = new JobPostingDto();
        jobPostingDto._id = jobPosting._id;
        jobPostingDto.name = jobPosting.name;
        jobPostingDto.detail = jobPosting.detail;
        jobPostingDto.startDate = jobPosting.startDate;
        jobPostingDto.endDate = jobPosting.endDate;
        jobPostingDto.company = jobPosting.company;

        return jobPostingDto;
    }
}
