import { Injectable, Body, ConflictException, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { MasterDataType } from './master-data-type.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SuccessResponse, setSuccessResponse } from 'src/response/success';
import { CreateMasterDataTypeForm } from './form/create-master-data-type.form';
import { errorMessages } from 'src/response/errors/custom';
import { MasterDataTypeConverter } from './converter/master-data-type.converter';
import { CommonFilter } from '../common/commonFilter';
import { MasterData } from 'src/master-data/master-data.schema';

@Injectable()
export class MasterDataTypeService {
    constructor(
        @InjectModel('MasterDataType')
        private readonly masterDataTypeModel: Model<MasterDataType>,
        @InjectModel('MasterData')
        private readonly masterDataModel: Model<MasterData>,
    ) {}
    async createMasterDataType(@Body() createMasterDataTypeForm: CreateMasterDataTypeForm): Promise<SuccessResponse> {
        const { name, masterData } = createMasterDataTypeForm;
        const existMasterDataType = await this.masterDataTypeModel.findOne({ name: name }).exec();
        const existMasterData = await this.masterDataModel.findOne({ _id: masterData }).exec();
        if (existMasterDataType) {
            throw new ConflictException(errorMessages.masterDataType.masterDataTypeAlreadyExist);
        }
        if (existMasterData) {
            const newMasterDataTypes = await this.masterDataTypeModel.create(createMasterDataTypeForm);
            existMasterData.masterDataTypes.push(newMasterDataTypes);
            await existMasterData.save();
            return setSuccessResponse('Tạo master data type thành công');
        } else {
            throw new ConflictException(errorMessages.masterData.masterDataNotFound);
        }
    }
    async getMasterDataTypeById(@Param('id') id: string): Promise<SuccessResponse> {
        const existMasterDataType = await this.masterDataTypeModel.findById(id).exec();
        if (existMasterDataType) {
            const masterDataTypeTypeDto = MasterDataTypeConverter.toDto(existMasterDataType);
            return setSuccessResponse('Lấy master data type thành công', masterDataTypeTypeDto);
        }
        throw new ConflictException(errorMessages.masterDataType.masterDataTypeNotFound);
    }
    async getAllMasterDataType(filter: CommonFilter): Promise<SuccessResponse> {
        const listMasterDataType = await this.masterDataTypeModel.find().exec();
        return setSuccessResponse('Lấy danh sách master data type thành công', listMasterDataType);
    }
    async updateMasterDataType(updateData: Partial<MasterDataType>): Promise<SuccessResponse> {
        const masterDataType = await this.masterDataTypeModel.findById(updateData._id).exec();
        if (!masterDataType) {
            throw new ConflictException(errorMessages.masterDataType.masterDataTypeNotFound);
        }
        Object.assign(masterDataType, updateData);

        await masterDataType.save();
        return setSuccessResponse('Cập nhật thành công');
    }
    async deleteMasterDataType(@Param('id') id: string): Promise<SuccessResponse> {
        const existingMasterDataType = await this.masterDataTypeModel.findById(id).exec();
        if (existingMasterDataType) {
            await existingMasterDataType.deleteOne();
            return setSuccessResponse('Xoá master data type thành công');
        }
        throw new ConflictException(errorMessages.masterDataType.masterDataTypeNotFound);
    }
}
