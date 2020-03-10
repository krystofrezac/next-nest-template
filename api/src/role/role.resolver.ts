import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { Int } from 'type-graphql';

import apiErrors from 'config/api/errors';

import Secured from 'auth/secured.guard';
import ResourceService from 'resource/resource.service';

import RoleService from './role.service';
import Role from './role.entity';

@Resolver()
class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly resourceService: ResourceService,
  ) {}

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

    if ((await this.roleService.findAll()).length < 2)
      throw new BadRequestException(apiErrors.remove.roleMinimalCount);

    const resources = await this.resourceService.findAll();
    for (const resource of resources) {
      const resourceRoles = await resource.roles;
      const roleIndex = resourceRoles.findIndex(r => r.id === id);
      if (roleIndex >= 0) {
        resourceRoles.splice(roleIndex, 1);
        break;
      }
    }
    if (!(await this.resourceService.validate(resources))) {
      throw new BadRequestException(apiErrors.remove.resourceConditions);
    }
    await this.roleService.remove(role);
    return true;
  }
}

export default RoleResolver;
