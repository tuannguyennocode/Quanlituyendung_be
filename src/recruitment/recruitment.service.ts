import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/company/company.schema';
import { JobPosting } from 'src/jobposting/jobposting.schema';
import { errorMessages } from 'src/response/errors/custom';
import { SuccessResponse, setSuccessResponse } from 'src/response/success';
import { UserAccount } from 'src/user-account/user-account.schema';
import { sendEmailAccept, sendEmailRefuse } from 'src/utils/sendEmail';
import { StateRecruitment } from './enum/state.enum';
import { CreateRecruitmentForm } from './form/create-recruitment.form';
import { Recruitment } from './recruitment.schema';

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
        const { userId, jobPostingId } = createRecruitmentForm;
        const existingDocument = await this.recruitmentModel.findOne({ jobPostingId, userId }).exec();
        const existJobPosting = await this.jobPostingModel.findOne({ _id: jobPostingId }).exec();
        const existUser = await this.userAccountModel.findOne({ _id: userId }).exec();

        if (existingDocument) {
            throw new ConflictException(errorMessages.recruitment.recruitmentAlreadyExist);
        }

        if (!existJobPosting) {
            throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
        } else if (!existUser) {
            throw new ConflictException(errorMessages.user.notFound);
        }
        const newRecruitment = await this.recruitmentModel.create(createRecruitmentForm);
        existJobPosting.recruitment.push(newRecruitment);
        existUser.recruitment.push(newRecruitment);
        await existJobPosting.save();
        await existUser.save();
        return setSuccessResponse('Tạo đơn ứng tuyển thành công');
    }
    async updateRecruitment(@Body() updateData: Partial<Recruitment>): Promise<SuccessResponse> {
        const existingRecruitment = await this.recruitmentModel.findById(updateData._id).exec();
        if (!existingRecruitment) {
            throw new ConflictException(errorMessages.recruitment.recruitmentNotFound);
        }
        const existUser = await this.userAccountModel.findById(existingRecruitment.userId).exec();
        if (updateData?.state == StateRecruitment.ACCEPT) {
            sendEmailAccept(existUser.email);
        } else if (updateData?.state == StateRecruitment.REFUSE) {
            sendEmailRefuse(existUser.email);
        }
        const newRecruitment = Object.assign(existingRecruitment, updateData);
        const existJobPosting = await this.jobPostingModel.findById(existingRecruitment.jobPostingId).exec();
        const index1 = existJobPosting.recruitment.findIndex(
            (recruitment) => existingRecruitment._id.toString() == recruitment._id.toString(),
        );
        if (index1 >= 0) {
            existJobPosting.recruitment[index1] = newRecruitment;
            await existJobPosting.save();
        }
        const index2 = existUser.recruitment.findIndex(
            (recruitment) => existingRecruitment._id.toString() == recruitment._id.toString(),
        );
        if (index2 >= 0) {
            existUser.recruitment[index2] = newRecruitment;
            await existUser.save();
        }
        await existingRecruitment.save();
        return setSuccessResponse('Cập nhật đơn ứng tuyển thành công');
    }
}
