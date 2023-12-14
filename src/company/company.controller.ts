import { Get, Put, Delete, Param, Body, Post, Request, UsePipes, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.public.decorator';
import { CreateCompanyForm } from './form/createcompanyform';
import { CompanyService } from './company.service';
import { UpdateCompanyForm } from './form/updatecompanyform';
import { CommonFilter } from '../common/commonFilter';
import { CompanyDto } from './dto/companydto';
@ApiTags('Company')
@Controller('company')
@UsePipes()
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    @Post()
    createCompany(@Body() createCompanyForm: CreateCompanyForm, @Request() req) {
        return this.companyService.createCompany(createCompanyForm, req);
    }
    @ApiBearerAuth()
    @Public()
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: CompanyDto,
    })
    @Get(':id')
    getCompany(@Param('id') id: string) {
        return this.companyService.getCompanyById(id);
    }
    @ApiBearerAuth()
    @Public()
    @ApiResponse({
        status: 200,
        description: 'OK',
        isArray: true,
        type: CompanyDto,
    })
    @Get()
    getAllCompany(@Query() filter: CommonFilter) {
        return this.companyService.getAllCompany(filter);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    @Put()
    updateCompany(@Body() updateCompanyForm: UpdateCompanyForm, @Request() req) {
        return this.companyService.updateCompany(updateCompanyForm, req);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    @Delete(':id')
    deleteCompany(@Param('id') id: string) {
        return this.companyService.deleteCompany(id);
    }
}
