import { Resolver, Query } from '@nestjs/graphql';

import Secured from 'auth/secured.guard';

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
}

export default RoleResolver;
