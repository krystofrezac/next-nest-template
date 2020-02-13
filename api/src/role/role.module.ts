import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Role from 'role/role.entity';
import RoleService from 'role/role.service';
import RoleResolver from 'role/role.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleResolver, RoleService],
  exports: [RoleService],
})
export default class RoleModule {}
