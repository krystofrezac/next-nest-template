import { Resolver, Query } from '@nestjs/graphql';

import ResourceCategory from './resourceCategory.entity';
import ResourceCategoryService from './resourceCategory.service';
import Secured from '../auth/secured.guard';

@Resolver()
class ResourceCategoryResolver {
  constructor(private readonly resourceCategoryService: ResourceCategoryService) {}

  @Query(() => [ResourceCategory])
  @Secured()
  async resourceCategoryFindAll() {
    return this.resourceCategoryService.findAll();
  }
}

export default ResourceCategoryResolver;
