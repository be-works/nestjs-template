import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose_soft_delete from 'mongoose-delete';
import * as paginate from 'mongoose-paginate-v2';
import { BaseSchema } from './base.schema';
export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin extends BaseSchema {
  @Prop({ unique: true })
  username: string;

  @Prop({ select: false })
  password: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.plugin(paginate);
AdminSchema.plugin(mongoose_soft_delete);
