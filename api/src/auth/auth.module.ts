import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import apiConfig from 'config/api';
import UsersModule from 'user/user.module';
import AuthService from 'auth/auth.service';
import JwtStrategy from 'auth/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: apiConfig.jwt.secret,
      signOptions: { expiresIn: apiConfig.jwt.expiresIn },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export default class AuthModule {}
