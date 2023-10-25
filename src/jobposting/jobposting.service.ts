import { Injectable, Request, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongoose';
import { JobPosting } from './jobposting.schema';
import { Company } from 'src/company/company.schema';
import { JobPostingDto } from './dto/jobposting.dto';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { Body, Param } from '@nestjs/common';
import { errorMessages } from 'src/response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { UpdateJobPostingForm } from './form/updatejobposting.form';
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
        const existingCompany = await this.companyModel.findById(createJobPostingForm.companyId).exec();
        if (!existingCompany) {
            throw new NotFoundException(errorMessages.company.companyNotFound);
        }
        const newJobPost = await this.jobPostingModel.create(createJobPostingForm);
        await newJobPost.save();
        return setSuccessResponse('Tạo bài tuyển dụng thành công');
    }
    async getJobPostById(@Param('id') id: string): Promise<SuccessResponse> {
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
            return setSuccessResponse('Lấy bài tuyển dụng thành công', jobPost);
        }
        throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
    }
    async getAllJobPost(): Promise<SuccessResponse> {
        const existingJobPosts = await this.jobPostingModel.find().exec();
        const jobPostingDtos: JobPostingDto[] = existingJobPosts.map((jobPosting) => ({
            _id: jobPosting.id,
            name: jobPosting.name,
            startDate: jobPosting.startDate,
            endDate: jobPosting.endDate,
            detail: jobPosting.detail,
        }));
        return setSuccessResponse('Lấy danh sách tuyển dụng thành công', jobPostingDtos);
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
    async updateJobPost(@Body() updateJobPostingForm: UpdateJobPostingForm): Promise<SuccessResponse> {
        const existingJobPost = await this.jobPostingModel.findById(updateJobPostingForm._id).exec();
        if (!existingJobPost) {
            throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
        }
        let existingCompany;
        if (!existingJobPost.company._id.equals(updateJobPostingForm.companyId)) {
            existingCompany = await this.companyModel.findById(updateJobPostingForm.companyId).exec();
            if (!existingCompany) {
                throw new NotFoundException(errorMessages.company.companyNotFound);
            }
        }

        existingJobPost.startDate = updateJobPostingForm.startDate;
        existingJobPost.endDate = updateJobPostingForm.endDate;
        existingJobPost.name = updateJobPostingForm.name;
        existingJobPost.detail = updateJobPostingForm.detail;
        existingJobPost.company = existingCompany;
        await existingJobPost.save();
        return setSuccessResponse('Cập nhật bài tuyển dụng thành công');
    }
}
