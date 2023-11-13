import { Injectable, Body, ConflictException, Param } from '@nestjs/common';
import { Model } from 'mongoose';
import { MasterData } from './master-data.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SuccessResponse, setSuccessResponse } from 'src/response/success';
import { CreateMasterDataForm } from './form/create-master-data.form';
import { errorMessages } from 'src/response/errors/custom';
import { MasterDataConverter } from './converter/master-data.converter';
import { CommonFilter } from '@/common/commonFilter';
import { MasterDataType } from 'src/master-data-type/master-data-type.schema';

@Injectable()
export class MasterDataService {
    constructor(
        @InjectModel('MasterData')
        private readonly masterDataModel: Model<MasterData>,
        @InjectModel('MasterDataType')
        private readonly masterDataTypeModel: Model<MasterDataType>,
    ) {}
    async createMasterData(@Body() createMasterDataForm: CreateMasterDataForm): Promise<SuccessResponse> {
        const { kind } = createMasterDataForm;
        const existMasterData = await this.masterDataModel.findOne({ kind: kind }).exec();
        if (existMasterData) {
            throw new ConflictException(errorMessages.masterData.masterDataAlreadyExist);
        }
        const newMasterData = await this.masterDataModel.create(createMasterDataForm);
        await newMasterData.save();
        return setSuccessResponse('Tạo master data thành công');
    }
    async getMasterDataById(@Param('id') id: string): Promise<SuccessResponse> {
        const existMasterData = await this.masterDataModel.findById(id).exec();
        if (existMasterData) {
            const masterDataTypes = await this.masterDataTypeModel
                .find({ parentKind: existMasterData.kind })
                .select('_id name parentKind')
                .exec();
            const masterDataDto = MasterDataConverter.toDto(existMasterData);
            return setSuccessResponse('Lấy master data thành công', { ...masterDataDto, masterDataTypes });
        }
        throw new ConflictException(errorMessages.masterData.masterDataNotFound);
    }
    async getAllMasterData(filter: CommonFilter): Promise<SuccessResponse> {
        const listMasterData = await this.masterDataModel
            .aggregate([
                {
                    $lookup: {
                        from: 'masterdatatypes',
                        localField: 'kind',
                        foreignField: 'parentKind',
                        as: 'masterDataTypes',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        parentKind: 1,
                        masterDataTypes: { _id: 1, name: 1, parentKind: 1 },
                    },
                },
            ])
            .exec();

        return setSuccessResponse('Lấy danh sách master data thành công', listMasterData);
    }
    async updateMasterData(updateData: Partial<MasterData>): Promise<SuccessResponse> {
        const masterData = await this.masterDataModel.findById(updateData._id).exec();
        if (!masterData) {
            throw new ConflictException(errorMessages.masterData.masterDataNotFound);
        }
        Object.assign(masterData, updateData);

        await masterData.save();
        return setSuccessResponse('Cập nhật thành công');
    }
    async deleteMasterData(@Param('id') id: string): Promise<SuccessResponse> {
        const existingMasterData = await this.masterDataModel.findById(id).exec();
        if (existingMasterData) {
            await existingMasterData.deleteOne();
            return setSuccessResponse('Xoá master data thành công');
        }
        throw new ConflictException(errorMessages.masterData.masterDataNotFound);
    }
}
