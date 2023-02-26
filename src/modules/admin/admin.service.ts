import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Builder } from 'builder-pattern';
import { PaginateModel } from 'mongoose';
import { AppConfig } from 'src/constants/config';
import { ErrorCode, Messages } from 'src/constants/message';
import { CollectionName } from 'src/databases/database.module';
import { AppBadRequestException } from 'src/exceptions';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(CollectionName.AdminSchema)
    private adminModel: PaginateModel<AdminDocument>,
  ) {}
  async create(data: CreateAdminDto) {
    const a = await this.adminModel
      .findOne({ username: data?.username })
      .exec();

    if (a) {
      throw new AppBadRequestException(
        ErrorCode.USER_IS_EXIST,
        Messages[ErrorCode.USER_IS_EXIST],
      );
    }

    const admin = Builder(Admin)
      .username(data?.username)
      .password(await bcrypt.hash(data?.password, AppConfig.saltOrRounds))
      .build();

    const r = await this.adminModel.create(admin);
    return r;
  }

  findAll() {
    return this.adminModel.paginate();
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
