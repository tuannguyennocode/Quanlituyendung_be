import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecruitmentForm } from './form/create-recruitment.form';
import { RecruitmentService } from './recruitment.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

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
        console.log(createRecruitmentForm);
        return this.recruitmentService.createRecruitment(createRecruitmentForm);
    }
}
