import { Resolver, Query, Args } from '@nestjs/graphql';

import Secured from 'auth/secured.guard';

import { Int } from 'type-graphql';
import RoleService from './role.service';
import Role from './role.entity';

@Resolver()
class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [Role])
  @Secured()
  async roleFindAll() {
    return this.roleService.findAll();
  }

  @Query(() => Role)
  @Secured()
  async roleFindById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.roleService.findById(id);
  }
}

export default RoleResolver;
