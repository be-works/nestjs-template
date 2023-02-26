import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { isObjectIdOrHexString, Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CollectionName } from 'src/databases/database.module';
import { AppUnAuthorizedException } from 'src/exceptions';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-guard') {
  constructor(
    @InjectModel(CollectionName.UserSchema)
    private accountModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_USER_SECRET,
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
