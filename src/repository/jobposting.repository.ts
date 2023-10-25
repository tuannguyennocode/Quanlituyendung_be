// company.repository.ts
import { Model } from 'mongoose';
import { Company } from 'src/company/company.schema';
import { JobPosting } from 'src/jobposting/jobposting.schema';

export class JobPostingRepository {
  constructor(private readonly jobPostingModel: Model<JobPosting>) {}

  async findAllJobPostingByCompanyId(companyId: string): Promise<JobPosting[]> {
    return this.jobPostingModel.find({ 'jobPostings.company._id': companyId }).exec();
  }
  // Thêm các hàm tùy chỉnh khác ở đây nếu cần thiết
}
