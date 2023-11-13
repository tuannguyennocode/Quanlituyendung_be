import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query } from '@nestjs/common';
import { MasterDataTypeService } from './master-data-type.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMasterDataTypeForm } from './form/create-master-data-type.form';
import { Public } from 'src/auth/auth.public.decorator';
import { CommonFilter } from '../common/commonFilter';
import { UpdateMasterDataTypeForm } from './form/update-master-data-type.form';
import { MasterDataTypeDto } from './dto/master-data-type.dto';

@ApiTags('Master Data Type')
@Controller('master-data-type')
export class MasterDataTypeController {
    constructor(private readonly masterDataService: MasterDataTypeService) {}
    @ApiBearerAuth()
    @Post()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    createMasterDataType(@Body() createMasterDataTypeForm: CreateMasterDataTypeForm) {
        return this.masterDataService.createMasterDataType(createMasterDataTypeForm);
    }

    @ApiBearerAuth()
    @Public()
    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'OK',
        type: MasterDataTypeDto,
    })
    getMasterDataType(@Param('id') id: string) {
        return this.masterDataService.getMasterDataTypeById(id);
    }

    @ApiBearerAuth()
    @Public()
    @Get()
    @ApiResponse({
        status: 200,
        description: 'OK',
        isArray: true,
        type: MasterDataTypeDto,
    })
    getAllMasterDataType(@Query() filter: CommonFilter) {
        return this.masterDataService.getAllMasterDataType(filter);
    }

    @ApiBearerAuth()
    @Put()
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    updateMasterDataType(@Body() updateMasterDataTypeForm: UpdateMasterDataTypeForm) {
        return this.masterDataService.updateMasterDataType(updateMasterDataTypeForm);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'OK',
    })
    deleteMasterDataType(@Param('id') id: string) {
        return this.masterDataService.deleteMasterDataType(id);
    }
}
