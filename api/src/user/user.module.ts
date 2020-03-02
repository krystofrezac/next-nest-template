import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AuthModule from 'auth/auth.module';
import User from 'user/user.entity';
import UserResolver from 'user/user.resolver';
import UserService from 'user/user.service';
import UserPaginatorResolver from 'user/paginator/userPaginator.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserResolver, UserPaginatorResolver, UserService],
  exports: [UserService],
})
export default class UserModule {}
