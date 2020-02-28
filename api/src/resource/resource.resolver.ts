import { Resolver, Query } from '@nestjs/graphql';

import Secured from 'auth/secured.guard';

import ResourceService from './resource.service';
import Resource from './resource.entity';

@Resolver()
class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Query(() => [Resource])
  @Secured()
  async resourceFindAll() {
    const resources = this.resourceService.findAll();
    return resources;
  }
}

export default ResourceResolver;
