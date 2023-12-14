import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateRecruitmentForm } from './form/create-recruitment.form';
import { RecruitmentService } from './recruitment.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateRecruitmentForm } from './form/update-recruitment.form';

@ApiTags('Recruitment')
@Controller('recruitment')
export class RecruitmentController {
    constructor(private readonly recruitmentService: RecruitmentService) {}
    @ApiBearerAuth()
    @Post()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    createRecruitment(@Body() createRecruitmentForm: CreateRecruitmentForm) {
        return this.recruitmentService.createRecruitment(createRecruitmentForm);
    }
    
    @ApiBearerAuth()
    @Put()
    updateJobPost(@Body() updateRecruitmentForm: UpdateRecruitmentForm) {
        return this.recruitmentService.updateRecruitment(updateRecruitmentForm);
    }
}
