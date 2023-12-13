import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recruitment } from './recruitment.schema';
import { Model } from 'mongoose';
import { SuccessResponse, setSuccessResponse } from 'src/response/success';
import { errorMessages } from 'src/response/errors/custom';
import { CreateRecruitmentForm } from './form/create-recruitment.form';
import { Company } from 'src/company/company.schema';
import { JobPosting } from 'src/jobposting/jobposting.schema';
import { UserAccount } from 'src/user-account/user-account.schema';

@Injectable()
export class RecruitmentService {
    constructor(
        @InjectModel('Recruitment')
        private readonly recruitmentModel: Model<Recruitment>,
        @InjectModel('Company')
        private readonly companyModel: Model<Company>,
        @InjectModel('JobPosting')
        private readonly jobPostingModel: Model<JobPosting>,
        @InjectModel('UserAccount')
        private readonly userAccountModel: Model<UserAccount>,
    ) {}
    async createRecruitment(@Body() createRecruitmentForm: CreateRecruitmentForm): Promise<SuccessResponse> {
        const { companyId, userId, jobPostingId } = createRecruitmentForm;
        console.log(companyId);
        const existCompany = await this.companyModel.findOne({ _id: companyId }).exec();
        const existJobPosting = await this.jobPostingModel.findOne({ _id: jobPostingId }).exec();
        const existUser = await this.userAccountModel.findOne({ _id: userId }).exec();

        if (!existCompany) {
            throw new ConflictException(errorMessages.company.companyNotFound);
        } else if (!existJobPosting) {
            throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
        } else if (!existUser) {
            throw new ConflictException(errorMessages.user.notFound);
        }
        const newRecruitment = await this.recruitmentModel.create(createRecruitmentForm);
        existCompany.recruitment.push(newRecruitment);
        existJobPosting.recruitment.push(newRecruitment);
        existUser.recruitment.push(newRecruitment);
        return setSuccessResponse('Tạo đơn ứng tuyển thành công');
    }
}
