import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Resource from 'resource/resource.entity';
import ResourceService from 'resource/resource.service';
import ResourceResolver from 'resource/resource.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourceResolver, ResourceService],
  exports: [ResourceService],
})
export default class ResourceModule {}
