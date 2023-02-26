import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/schemas/admin.schema';
import { UserSchema } from 'src/schemas/user.schema';

export const CollectionName = {
  UserSchema: 'User_Schema',
  AdminSchema: 'Admin_Schema',
};

export const listSchemas: ModelDefinition[] = [
  { name: CollectionName.UserSchema, schema: UserSchema },
  { name: CollectionName.AdminSchema, schema: AdminSchema },
];

@Module({
  imports: [MongooseModule.forFeature(listSchemas)],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
