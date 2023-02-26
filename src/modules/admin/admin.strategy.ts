import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CollectionName } from 'src/databases/database.module';
import { AppUnAuthorizedException } from 'src/exceptions';
import { Admin } from 'src/schemas/admin.schema';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(
  Strategy,
  'admin-guard',
) {
  constructor(
    @InjectModel(CollectionName.AdminSchema)
    private accountModel: Model<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ADMIN_SECRET,
    });
  }

  async validate(payload: any) {
    if (!isObjectIdOrHexString(payload?.sub)) {
      throw new UnauthorizedException();
    }

    const account = await this.accountModel
      .findOne({ _id: payload.sub, deletedAt: null })
      .exec();

    if (!account) {
      throw new AppUnAuthorizedException();
    }

    return account;
  }
}
