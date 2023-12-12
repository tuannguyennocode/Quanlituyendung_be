import { Injectable, Request, ConflictException, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongoose';
import { JobPosting } from './jobposting.schema';
import { Company } from '../company/company.schema';
import { JobPostingDto } from './dto/jobposting.dto';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { Body, Param } from '@nestjs/common';
import { errorMessages } from '../response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { UpdateJobPostingForm } from './form/updatejobposting.form';
import { JobPostingConverter } from './converter/jobposting.converter';
import { JobPostingFilter } from './filter/jobposting.filter';
@Injectable()
export class JobPostingService {
    constructor(
        @InjectModel('JobPosting')
        private readonly jobPostingModel: Model<JobPosting>,
        @InjectModel('Company')
        private readonly companyModel: Model<Company>,
    ) {}

    async createJobPost(@Body() createJobPostingForm: CreateJobPostingForm, @Request() req): Promise<SuccessResponse> {
        const { name } = createJobPostingForm;
        // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
        const existingJobPost = await this.jobPostingModel.findOne({ name: name }).exec();
        if (existingJobPost) {
            throw new ConflictException(errorMessages.jobPosting.jobPostingAlreadyExist);
        }
        const existingCompany = await this.companyModel.findById(createJobPostingForm.company).exec();
        if (!existingCompany) {
            throw new NotFoundException(errorMessages.company.companyNotFound);
        }
        const newJobPost = await this.jobPostingModel.create(createJobPostingForm);
        await newJobPost.save();

        existingCompany.jobPostings.push(newJobPost);
        await existingCompany.save();
        return setSuccessResponse('Tạo bài tuyển dụng thành công');
    }
    async getJobPostById(@Param('id') id: string): Promise<SuccessResponse> {
        // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
        const existingJobPost = await this.jobPostingModel.findById(id).populate('company', 'name avatar_url').exec();
        if (existingJobPost) {
            const jobPost = JobPostingConverter.toDto(existingJobPost);
            return setSuccessResponse('Lấy bài tuyển dụng thành công', jobPost);
        }
        throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
    }
    async getAllJobPost(filter: JobPostingFilter): Promise<SuccessResponse> {
        const startIndex = (filter.page - 1) * filter.perPage;
        const totalJobPosts = await this.jobPostingModel.countDocuments().exec();
        const existingJobPosts = await this.jobPostingModel
            .find()
            .skip(startIndex)
            .limit(filter.perPage)
            .populate('company', 'name avatar_url')
            .exec();
        const jobPostingDtos: JobPostingDto[] = existingJobPosts.map((jobPosting) =>
            JobPostingConverter.toDto(jobPosting),
        );
        return setSuccessResponse('Lấy danh sách tuyển dụng thành công', {
            jobPostings: jobPostingDtos,
            page: filter.page,
            perPage: filter.perPage,
            totalItems: totalJobPosts,
        });
    }

    async deleteJobPost(@Param('id') id: string): Promise<SuccessResponse> {
        // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
        const existingJobPost = await this.jobPostingModel.findById(id).exec();
        if (existingJobPost) {
            await existingJobPost.deleteOne();
            return setSuccessResponse('Xoá bài tuyển dụng thành công');
        }
        throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
    }
    async updateJobPost(@Body() updateData: Partial<JobPosting>): Promise<SuccessResponse> {
        const existingJobPost = await this.jobPostingModel.findById(updateData._id).exec();
        if (!existingJobPost) {
            throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
        }
        if (updateData.name != existingJobPost.name) {
            const exsitingCompany = await this.companyModel.findOne({ name: updateData.name }).exec();
            if (exsitingCompany) {
                throw new ConflictException(errorMessages.jobPosting.jobPostingAlreadyExist);
            }
        }
        Object.assign(existingJobPost, updateData);
        await existingJobPost.save();
        return setSuccessResponse('Cập nhật bài tuyển dụng thành công');
    }
}
