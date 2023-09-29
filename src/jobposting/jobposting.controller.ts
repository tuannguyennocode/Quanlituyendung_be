import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JobPostingDto } from './dto/jobposting.dto';
import { CreateJobPostingForm } from './form/createjobposting.form';
import { JobPostingService } from './jobposting.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.public.decorator';
@ApiTags('job-posting')
@Controller('job-posting')
export class JobpostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}
  @ApiBearerAuth()
  @Post()
  postJob(@Body() createJobPostingForm: CreateJobPostingForm) {
    return this.jobPostingService.createJobPost(createJobPostingForm);
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
  getAllJobPost() {
    return this.jobPostingService.getAllJobPost();
  }

  @ApiBearerAuth()
  @Put()
  updateJobPost(@Body() jobPostingDto: JobPostingDto) {
    return this.jobPostingService.updateJobPost(jobPostingDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  deleteJobPost(@Param('id') id: string) {
    return this.jobPostingService.deleteJobPost(id);
  }
}
