import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Resource from 'resource/resource.entity';
import ResourceService from 'resource/resource.service';
import ResourceResolver from 'resource/resource.resolver';
import AuthModule from '../auth/auth.module';
import RoleModule from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource]), AuthModule, forwardRef(() => RoleModule)],
  providers: [ResourceResolver, ResourceService],
  exports: [ResourceService],
})
export default class ResourceModule {}
