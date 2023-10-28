/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Param, Put, Delete, Request, UsePipes, Query } from '@nestjs/common';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { JobPostingService } from './jobposting.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.public.decorator';
import { UpdateJobPostingForm } from './form/updatejobposting.form';
@ApiTags('job-posting')
@Controller('job-posting')
@UsePipes()
export class JobpostingController {
    constructor(private readonly jobPostingService: JobPostingService) {}
    @ApiBearerAuth()
    @Post()
    postJob(@Body() createJobPostingForm: CreateJobPostingForm, @Request() req) {
        return this.jobPostingService.createJobPost(createJobPostingForm, req);
    }
    @ApiBearerAuth()
    @Public()
    @Get(':id')
    getJobById(@Param('id') id: string) {
        console.log(id);
        return this.jobPostingService.getJobPostById(id);
    }
    @ApiBearerAuth()
    @Public()
    @Get()
    getAllJobPost(@Query('page') page: number, @Query('perPage') perPage: number) {
        return this.jobPostingService.getAllJobPost(page, perPage);
    }

    @ApiBearerAuth()
    @Put()
    updateJobPost(@Body() updateJobPostingForm: UpdateJobPostingForm) {
        return this.jobPostingService.updateJobPost(updateJobPostingForm);
    }

    @ApiBearerAuth()
    @Delete(':id')
    deleteJobPost(@Param('id') id: string) {
        return this.jobPostingService.deleteJobPost(id);
    }
}
