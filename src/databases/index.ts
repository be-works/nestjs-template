import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

export class DatabaseOptions implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.MONGO_URI,
      retryAttempts: 2,
      retryDelay: 2000,
    };
  }
}
