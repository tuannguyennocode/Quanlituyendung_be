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
        jobPostingDto.skills = jobPosting.skills;
        jobPostingDto.levels = jobPosting.levels;
        jobPostingDto.job_types = jobPosting.job_types;
        jobPostingDto.recruitment = jobPosting.recruitment;
        return jobPostingDto;
    }
}
