import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Role from 'role/role.entity';
import RoleService from 'role/role.service';
import RoleResolver from 'role/role.resolver';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
