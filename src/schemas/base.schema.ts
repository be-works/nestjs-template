import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class BaseSchema {
  _id: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
