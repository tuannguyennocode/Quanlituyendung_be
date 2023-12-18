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
import { Recruitment } from 'src/recruitment/recruitment.schema';
@Injectable()
export class JobPostingService {
    constructor(
        @InjectModel('JobPosting')
        private readonly jobPostingModel: Model<JobPosting>,
        @InjectModel('Company')
        private readonly companyModel: Model<Company>,
        @InjectModel('Recruitment')
        private readonly recruitmentModel: Model<Recruitment>,
    ) {}

    async createJobPost(@Body() createJobPostingForm: CreateJobPostingForm, @Request() req): Promise<SuccessResponse> {
        const { name, skills, levels } = createJobPostingForm;
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
    async getAllJobPost(masterData: any, filter: JobPostingFilter): Promise<SuccessResponse> {
        const skills = masterData?.skills?.split(',');
        const levels = masterData?.levels?.split(',');
        const job_types = masterData?.job_types?.split(',');
        const name = masterData?.name;
        let query = {};
        if (skills) {
            query['skills.name'] = { $all: skills };
        }
        if (levels) {
            query['levels.name'] = { $all: levels };
        }
        if (job_types) {
            query['job_types.name'] = { $all: job_types };
        }
        if (name) {
            query['name'] = { $regex: new RegExp(name, 'i') };
        }
        const startIndex = (filter.page - 1) * filter.perPage;
        const totalJobPosts = await this.jobPostingModel.countDocuments().exec();
        const existingJobPosts = await this.jobPostingModel
            .find(query)
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
            await this.recruitmentModel.deleteMany({ jobPostingId: id }).exec();
            const companyId = existingJobPost.company;
            await existingJobPost.deleteOne();
            const company = await this.companyModel.findById(companyId).exec();
            const jobPostings = company.jobPostings;
            const updatedJobPostings = jobPostings.filter((job) => job._id.toString() !== id);
            company.jobPostings = updatedJobPostings;

            await company.save();
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
            const existingCompany = await this.companyModel.findOne({ name: updateData.name }).exec();
            if (existingCompany) {
                throw new ConflictException(errorMessages.jobPosting.jobPostingAlreadyExist);
            }
        }
        const newJobPosting = Object.assign(existingJobPost, updateData);
        const existingCompany = await this.companyModel.findById(existingJobPost.company).exec();
        const index1 = existingCompany?.jobPostings?.findIndex(
            (jobPosting) => existingJobPost._id.toString() == jobPosting._id.toString(),
        );
        if (index1 >= 0) {
            existingCompany.jobPostings[index1] = newJobPosting;
            await existingCompany.save();
        }
        await existingJobPost.save();
        return setSuccessResponse('Cập nhật bài tuyển dụng thành công');
    }
}
