import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { listSchemas } from 'src/databases/database.module';
import { AdminController } from './admin.controller';
import { AdminGuard } from './admin.guard';
import { AdminService } from './admin.service';
import { AdminJwtStrategy } from './admin.strategy';

@Module({
  imports: [
    MongooseModule.forFeature(listSchemas),
    JwtModule.register({
      secret: process.env.JWT_ADMIN_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminJwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AdminModule {}
