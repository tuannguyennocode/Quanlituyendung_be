/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Put, Delete, Request, UsePipes, Query } from '@nestjs/common';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { JobPostingService } from './jobposting.service';

import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/auth.public.decorator';
import { UpdateJobPostingForm } from './form/updatejobposting.form';
import { JobPostingFilter } from './filter/jobposting.filter';
import { JobPostingDto } from './dto/jobposting.dto';
@ApiTags('Job Posting')
@Controller('job-posting')
@UsePipes()
export class JobpostingController {
    constructor(private readonly jobPostingService: JobPostingService) {}
    @ApiBearerAuth()
    @Post()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    postJob(@Body() createJobPostingForm: CreateJobPostingForm, @Request() req) {
        return this.jobPostingService.createJobPost(createJobPostingForm, req);
    }

    @ApiBearerAuth()
    @Public()
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: JobPostingDto,
    })
    @Get(':id')
    getJobById(@Param('id') id: string) {
        return this.jobPostingService.getJobPostById(id);
    }

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        description: 'OK',
        isArray: true,
        type: JobPostingDto,
    })
    @Public()
    @Get()
    getAllJobPost(@Query() filter?: JobPostingFilter,) {
        return this.jobPostingService.getAllJobPost(filter);
    }

    @ApiBearerAuth()
    @Put()
    updateJobPost(@Body() updateJobPostingForm: UpdateJobPostingForm) {
        return this.jobPostingService.updateJobPost(updateJobPostingForm);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    deleteJobPost(@Param('id') id: string) {
        return this.jobPostingService.deleteJobPost(id);
    }
}
