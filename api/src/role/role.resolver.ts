import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { Int } from 'type-graphql';

import apiErrors from 'config/apiErrors';

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

  @Query(() => Role)
  @Secured()
  async roleFindById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.roleService.findById(id);
  }

  @Mutation(() => Role)
  @Secured()
  async roleCreate(@Args('name') name: string) {
    if (!/[a-zA-Z]+/.test(name)) {
      return new BadRequestException(apiErrors.input.invalid);
    }
    const role = new Role();
    role.name = name;
    return this.roleService.save(role);
  }

  @Mutation(() => Boolean)
  @Secured()
  async roleRemove(@Args({ name: 'id', type: () => Int }) id: number) {
    const role = await this.roleService.findById(id);
    if (!role) return new BadRequestException(apiErrors.input.invalid);
    await this.roleService.remove(role);
    return true;
  }
}

export default RoleResolver;
