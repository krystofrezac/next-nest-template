import { Resolver, Query } from '@nestjs/graphql';

import ResourceService from './resource.service';
import Resource from './resource.entity';

@Resolver()
class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  @Query(() => [Resource])
  async resourceFindAll() {
    const resources = this.resourceService.findAll();
    return resources;
  }
}

export default ResourceResolver;
