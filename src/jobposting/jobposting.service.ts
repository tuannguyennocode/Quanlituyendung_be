import { Injectable, Request, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JobPosting } from "./jobposting.schema";
import { JobPostingDto } from "./dto/jobposting.dto";
import { CreateJobPostingForm } from "./form/createjobposting.form";
import { Body, Param } from "@nestjs/common";
import { errorMessages } from "src/response/errors/custom";
import { SuccessResponse, setSuccessResponse } from "src/response/success";
@Injectable()
export class JobPostingService {
  constructor(
    @InjectModel("JobPosting")
    private readonly jobPostingModel: Model<JobPosting>,
  ) {}

  async createJobPost(@Body() createJobPostingForm: CreateJobPostingForm, @Request() req): Promise<SuccessResponse> {
    const { name } = createJobPostingForm;
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findOne({ name: name }).exec();
    if (existingJobPost) {
      throw new ConflictException(errorMessages.jobPosting.jobPostingAlreadyExist);
    }
    console.log("ok");
    const newJobPost = await this.jobPostingModel.create(createJobPostingForm);
    newJobPost.createBy = req.user.username;
    await newJobPost.save();
    return setSuccessResponse("Tạo bài tuyển dụng thành công");
  }
  async getJobPostById(@Param("id") id: string): Promise<SuccessResponse> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(id).exec();
    if (existingJobPost) {
      const jobPost: JobPostingDto = {
        _id: existingJobPost.id,
        startDate: existingJobPost.startDate,
        endDate: existingJobPost.endDate,
        name: existingJobPost.name,
        detail: existingJobPost.detail,
      };
      return setSuccessResponse("Lấy bài tuyển dụng thành công", jobPost);
    }
    throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
  }
  async getAllJobPost(): Promise<SuccessResponse> {
    const existingJobPosts = await this.jobPostingModel.find().exec();

    return setSuccessResponse("Lấy danh sách tuyển dụng thành công", existingJobPosts);
  }

  async deleteJobPost(@Param("id") id: string): Promise<SuccessResponse> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(id).exec();
    if (existingJobPost) {
      await existingJobPost.deleteOne();
      return setSuccessResponse("Xoá bài tuyển dụng thành công");
    }
    throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
  }
  async updateJobPost(@Body() jobPostingDto: JobPostingDto): Promise<SuccessResponse> {
    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const { _id, name, detail, startDate, endDate } = jobPostingDto;

    // Kiểm tra xem jobpost đã tồn tại trong cơ sở dữ liệu chưa
    const existingJobPost = await this.jobPostingModel.findById(_id).exec();
    if (existingJobPost) {
      existingJobPost.startDate = startDate;
      existingJobPost.endDate = endDate;
      existingJobPost.name = name;
      existingJobPost.detail = detail;
      await existingJobPost.save();
      return setSuccessResponse("Cập nhật bài tuyển dụng thành công");
    }
    throw new ConflictException(errorMessages.jobPosting.jobPostingNotFound);
  }
}
