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
        jobPosting.startDate = jobPosting.startDate;
        jobPosting.endDate = jobPosting.endDate;

        return jobPostingDto;
    }
}
