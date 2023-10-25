// company.repository.ts
import { Model } from 'mongoose';
import { Company } from 'src/company/company.schema';

export class CompanyRepository {
  constructor(private readonly companyModel: Model<Company>) {}


  // Thêm các hàm tùy chỉnh khác ở đây nếu cần thiết
}
