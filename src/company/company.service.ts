import { Injectable, Request, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Body, Param } from '@nestjs/common';
import { Company } from './company.schema';
import { CreateCompanyForm } from './form/createcompanyform';
import { UpdateCompanyForm } from './form/updatecompanyform';
import { CompanyDto } from './dto/companydto';
import { errorMessages } from 'src/response/errors/custom';
import { SuccessResponse, setSuccessResponse } from '../response/success';
import { Model } from 'mongoose';
@Injectable()
export class CompanyService {
    constructor(
        @InjectModel('Company')
        private readonly companyModel: Model<Company>,
    ) {}

    async createCompany(@Body() createCompanyForm: CreateCompanyForm, @Request() req): Promise<SuccessResponse> {
        const { name } = createCompanyForm;
        const exsitingCompany = await this.companyModel.findOne({ name: name }).exec();
        if (exsitingCompany) {
            throw new ConflictException(errorMessages.company.companyAlreadyExist);
        }
        const newCompany = await this.companyModel.create(createCompanyForm);
        await newCompany.save();
        return setSuccessResponse('Tạo công ty thành công');
    }
    async getCompanyById(@Param('id') id: string): Promise<SuccessResponse> {
        const existingCompany = await this.companyModel.findById(id).exec();
        if (existingCompany) {
            const company: CompanyDto = {
                _id: existingCompany.id,
                name: existingCompany.name,
                email: existingCompany.email,
                phoneNumber: existingCompany.phoneNumber,
                address: existingCompany.name,
                company_size: existingCompany.company_size,
                web_url: existingCompany.web_url,
                description: existingCompany.description,
            };
            return setSuccessResponse('Lấy công ty thành công', company);
        }
        throw new ConflictException(errorMessages.company.companyNotFound);
    }
    async getAllCompany(): Promise<SuccessResponse> {
        const existingCompanys = await this.companyModel.find().exec();

        const companyDtos: CompanyDto[] = existingCompanys.map((company) => ({
            _id: company.id,
            name: company.name,
            phoneNumber: company.phoneNumber,
            email: company.email,
            address: company.address,
            company_size: company.company_size,
            web_url: company.web_url,
            description: company.description,
        }));

        return setSuccessResponse('Lấy danh sách công ty thành công', companyDtos);
    }
    async deleteCompany(@Param('id') id: string): Promise<SuccessResponse> {
        // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
        const existingCompany = await this.companyModel.findById(id).exec();
        if (existingCompany) {
            await existingCompany.deleteOne();
            return setSuccessResponse('Xoá công ty thành công');
        }
        throw new ConflictException(errorMessages.company.companyNotFound);
    }
    async updateCompany(@Body() updateCompanyForm: UpdateCompanyForm): Promise<SuccessResponse> {
        const existingCompany = await this.companyModel.findById(updateCompanyForm._id).exec();
        if (existingCompany) {
            existingCompany.name = updateCompanyForm.name;
            existingCompany.phoneNumber = updateCompanyForm.phoneNumber;
            existingCompany.email = updateCompanyForm.email;
            existingCompany.address = updateCompanyForm.address;
            existingCompany.company_size = updateCompanyForm.company_size;
            existingCompany.web_url = updateCompanyForm.web_url;
            existingCompany.description = updateCompanyForm.description;
            await existingCompany.save();
            return setSuccessResponse('Cập nhật công ty thành công');
        }
        throw new ConflictException(errorMessages.company.companyNotFound);
    }
}
