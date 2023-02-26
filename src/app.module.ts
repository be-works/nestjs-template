import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptions } from './databases';
import { AdminModule } from './modules/admin/admin.module';
import { NewsModule } from './modules/news/news.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({ useClass: DatabaseOptions }),
    UserModule,
    NewsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
