import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose_soft_delete from 'mongoose-delete';
import * as paginate from 'mongoose-paginate-v2';
import { OpenAccountType } from 'src/constants';
import { BaseSchema } from './base.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ unique: true })
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop()
  fullName: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ type: String, enum: OpenAccountType })
  openType: string;

  @Prop()
  avatar: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: Date, default: Date.now })
  lastLoginTime: Date;

  @Prop({ type: Boolean, default: false })
  isOnline: boolean;

  @Prop({ length: 10, unique: true })
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(paginate);
UserSchema.plugin(mongoose_soft_delete);
