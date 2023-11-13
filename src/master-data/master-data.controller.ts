import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query } from '@nestjs/common';
import { MasterDataService } from './master-data.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMasterDataForm } from './form/create-master-data.form';
import { Public } from 'src/auth/auth.public.decorator';
import { CommonFilter } from '@/common/commonFilter';
import { UpdateMasterDataForm } from './form/update-master-data.form';
import { MasterDataDto } from './dto/master-data.dto';

@ApiTags('Master Data')
@Controller('master-data')
export class MasterDataController {
    constructor(private readonly masterDataService: MasterDataService) {}
    @ApiBearerAuth()
    @Post()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    createMasterData(@Body() createMasterDataForm: CreateMasterDataForm) {
        return this.masterDataService.createMasterData(createMasterDataForm);
    }

    @ApiBearerAuth()
    @Public()
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: MasterDataDto,
    })
    @Get(':id')
    getMasterData(@Param('id') id: string) {
        return this.masterDataService.getMasterDataById(id);
    }

    @ApiBearerAuth()
    @Public()
    @Get()
    @ApiResponse({
        status: 200,
        isArray: true,
        description: 'OK',
        type: MasterDataDto,
    })
    getAllMasterData(@Query() filter: CommonFilter) {
        return this.masterDataService.getAllMasterData(filter);
    }

    @ApiBearerAuth()
    @Put()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    updateMasterData(@Body() updateMasterDataForm: UpdateMasterDataForm) {
        return this.masterDataService.updateMasterData(updateMasterDataForm);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    deleteMasterData(@Param('id') id: string) {
        return this.masterDataService.deleteMasterData(id);
    }
}
