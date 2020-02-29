import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Role from 'role/role.entity';
import RoleService from 'role/role.service';
import RoleResolver from 'role/role.resolver';
import AuthModule from '../auth/auth.module';
import ResourceModule from '../resource/resource.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), AuthModule, ResourceModule],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
