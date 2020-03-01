import { Resolver, Query, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';

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

  @Query(() => ResourceCategory)
  @Secured()
  async resourceCategoryFindById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.resourceCategoryService.findById(id);
  }
}

export default ResourceCategoryResolver;
