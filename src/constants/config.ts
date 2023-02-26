import { JwtModuleOptions } from '@nestjs/jwt';

export const AppConfig = {
  jwt: {
    admin: { signOptions: { expiresIn: '30d' } } as JwtModuleOptions,
    user: { signOptions: { expiresIn: '30d' } } as JwtModuleOptions,
  },
  saltOrRounds: 12,
};
