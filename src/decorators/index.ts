import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC, Permission, PERMISSION_KEY } from 'src/constants';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export const MakePublic = () => SetMetadata(IS_PUBLIC, true);

export const RequirePermissions = (...permissions: Permission[]) => {
  return SetMetadata(PERMISSION_KEY, permissions);
};
