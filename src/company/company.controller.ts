import { Get, Put, Delete, Param, Body, Post, Request, UsePipes, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.public.decorator';
import { CreateCompanyForm } from './form/createcompanyform';
import { CompanyService } from './company.service';
import { UpdateCompanyForm } from './form/updatecompanyform';
@ApiTags('Company')
@Controller('company')
@UsePipes()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
    @ApiBearerAuth()
    @Post()
    createCompany(@Body() createCompanyForm: CreateCompanyForm, @Request() req) {
        return this.companyService.createCompany(createCompanyForm, req);
    }
    @ApiBearerAuth()
    @Public()
    @Get(':id')
    getCompany(@Param('id') id: string) {
        return this.companyService.getCompanyById(id);
    }
    @ApiBearerAuth()
    @Public()
    @Get()
    getAllCompany(@Query('page') page: number, @Query('perPage') perPage: number, @Query('phoneNumber') phoneNumber: string) {
        return this.companyService.getAllCompany(page, perPage, phoneNumber);
    }

    @ApiBearerAuth()
    @Put()
    updateCompany(@Body() updateCompanyForm: UpdateCompanyForm) {
        return this.companyService.updateCompany(updateCompanyForm);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(id);
    }
}
