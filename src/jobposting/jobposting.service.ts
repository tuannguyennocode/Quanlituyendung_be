import { Injectable, Request } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobPosting } from './jobposting.schema';
import { JobPostingDto } from './dto/jobposting.dto';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { Body, Param } from '@nestjs/common';
import { UserAccount } from 'src/user-account/user-account.schema';

@Injectable()
export class JobPostingService {
  constructor(
    @InjectModel('JobPosting')
    private readonly jobPostingModel: Model<JobPosting>,
  ) {}

  async createJobPost(
    @Body() createJobPostingForm: CreateJobPostingForm,
    @Request() req,
  ): Promise<string> {
    const { name } = CreateJobPostingForm;

    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel
      .findOne({ name: name })
      .exec();

    if (existingJobPost) {
      return 'JobPost already exists';
    }

    const newJobPost = await this.jobPostingModel.create(createJobPostingForm);
    newJobPost.createBy = req.user.username;
    await newJobPost.save();
    return 'Create job-posting successfully';
  }
  async getJobPostById(
    @Param('id') id: string,
  ): Promise<JobPostingDto | string> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(id).exec();
    if (existingJobPost) {
      const jobPost: JobPostingDto = {
        _id: existingJobPost.id,
        startDate: existingJobPost.startDate,
        endDate: existingJobPost.endDate,
        name: existingJobPost.name,
        detail: existingJobPost.detail,
      };
      return jobPost;
    }
    return 'Job post not found';
  }
  getAllJobPost(): Promise<JobPosting[]> {
    const existingJobPosts = this.jobPostingModel.find().exec();

    return existingJobPosts;
  }

  async deleteJobPost(
    @Param('id') id: string,
  ): Promise<JobPostingDto | string> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(id).exec();
    if (existingJobPost) {
      await existingJobPost.deleteOne();
      return 'Delete job-posting successfully';
    }
    return 'Job post not found';
  }
  async updateJobPost(
    @Body() jobPostingDto: JobPostingDto,
  ): Promise<JobPostingDto | string> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const { _id, name, detail, startDate, endDate } = jobPostingDto;

    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(_id).exec();
    if (existingJobPost) {
      existingJobPost.startDate = startDate;
      existingJobPost.endDate = endDate;
      existingJobPost.name = name;
      existingJobPost.detail = detail;
      await existingJobPost.save();
      return 'Update job-posting successfully';
    }
    return 'Job post not found';
  }
}
