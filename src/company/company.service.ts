import { Injectable, Request, ConflictException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Body, Param } from '@nestjs/common';
import { Company } from './company.schema';
import { CreateCompanyForm } from './form/createcompanyform';
import { UpdateCompanyForm } from './form/updatecompanyform';
import { CompanyDto } from './dto/companydto';
import { errorMessages } from '../response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { Model } from 'mongoose';
import { CompanyConverter } from './converter/company.converter';
import { CommonFilter } from '../common/commonFilter';
@Injectable()
export class CompanyService {
    constructor(
        @InjectModel('Company')
        private readonly companyModel: Model<Company>,
    ) {}

    async createCompany(@Body() createCompanyForm: CreateCompanyForm): Promise<SuccessResponse> {
        const { name, phoneNumber, email } = createCompanyForm;
        const existCompany = await this.companyModel.findOne({ name: name }).exec();
        if (existCompany) {
            throw new ConflictException(errorMessages.company.companyNameAlreadyExist);
        }
        const existingCompanyByPhoneNumber = await this.companyModel.findOne({ phoneNumber: phoneNumber }).exec();
        if (existingCompanyByPhoneNumber) {
            throw new ConflictException(errorMessages.company.companyPhoneNumberAlreadyExist);
        }
        const existingCompanyByEmail = await this.companyModel.findOne({ email: email }).exec();
        if (existingCompanyByEmail) {
            throw new ConflictException(errorMessages.company.companyEmailAlreadyExist);
        }
        const newCompany = await this.companyModel.create(createCompanyForm);
        await newCompany.save();
        return setSuccessResponse('Tạo công ty thành công');
    }

    async getCompanyById(@Param('id') id: string): Promise<SuccessResponse> {
        const existingCompany = await this.companyModel.findById(id).exec();
        if (existingCompany) {
            const companyDto = CompanyConverter.toDto(existingCompany);
            return setSuccessResponse('Lấy công ty thành công', companyDto);
        }
        throw new ConflictException(errorMessages.company.companyNotFound);
    }

    async getAllCompany(filter: CommonFilter): Promise<SuccessResponse> {
        const startIndex = (filter.page - 1) * filter.perPage;
        const phoneCondition = filter.phoneNumber ? { phoneNumber: filter.phoneNumber } : {};
        const totalJobPosts = await this.companyModel.countDocuments({ ...phoneCondition }).exec();

        const existingCompanies = await this.companyModel
            .find({ ...phoneCondition })
            .skip(startIndex)
            .limit(filter.perPage)
            .select('_id name avatar_url review')
            .exec();
        const companyDtos: CompanyDto[] = existingCompanies.map((company) => CompanyConverter.toDto(company));
        return setSuccessResponse('Lấy danh sách công ty thành công', {
            companyDtos: companyDtos,
            page: filter.page,
            perPage: filter.perPage,
            totalItems: totalJobPosts,
        });
    }

    async deleteCompany(@Param('id') id: string): Promise<SuccessResponse> {
        const existingCompany = await this.companyModel.findById(id).exec();
        if (existingCompany) {
            await existingCompany.deleteOne();
            return setSuccessResponse('Xoá công ty thành công');
        }
        throw new ConflictException(errorMessages.company.companyNotFound);
    }
    async updateCompany(@Body() updateData: Partial<Company>, @Request() req): Promise<SuccessResponse> {
        const existingCompany = await this.companyModel.findById(updateData._id).exec();
        if (!existingCompany) {
            throw new ConflictException(errorMessages.company.companyNotFound);
        }
        if (updateData.name != existingCompany.name) {
            const exsitingCompany = await this.companyModel.findOne({ name: updateData.name }).exec();
            if (exsitingCompany) {
                throw new ConflictException(errorMessages.company.companyNameAlreadyExist);
            }
        }
        if (updateData.phoneNumber != existingCompany.phoneNumber) {
            const existingCompanyByPhoneNumber = await this.companyModel
                .findOne({ phoneNumber: updateData.phoneNumber })
                .exec();
            if (existingCompanyByPhoneNumber) {
                throw new ConflictException(errorMessages.company.companyPhoneNumberAlreadyExist);
            }
        }
        if (updateData.email != existingCompany.email) {
            const existingCompanyByEmail = await this.companyModel.findOne({ email: updateData.email }).exec();
            if (existingCompanyByEmail) {
                throw new ConflictException(errorMessages.company.companyEmailAlreadyExist);
            }
        }
        Object.assign(existingCompany, updateData);
        existingCompany.save();
        return setSuccessResponse('Cập nhật công ty thành công');
    }
}
