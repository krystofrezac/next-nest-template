import { Resolver } from '@nestjs/graphql';
import ResourceService from './resource.service';

@Resolver()
class ResourceResolver {
  constructor(private readonly resourceService: ResourceService) {}

  async resourceFindAll() {
    return this.resourceService.findAll();
  }
}

export default ResourceResolver;
