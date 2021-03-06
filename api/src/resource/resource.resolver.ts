import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { Int } from 'type-graphql';

import Secured from 'auth/secured.guard';

import RoleService from 'role/role.service';

import apiErrors from 'config/api/errors';
import resources from 'config/api/resources';

import ResourceService from './resource.service';
import Resource from './resource.entity';
import ChangedRoleArg from './args/changedRole.arg';

@Resolver()
class ResourceResolver {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly roleService: RoleService,
  ) {}

  @Query(() => [Resource])
  @Secured()
  async resourceFindAll() {
    return this.resourceService.findAll();
  }

  @Query(() => Resource)
  async resourceFindById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.resourceService.findById(id);
  }

  @Mutation(() => [Resource], { nullable: true })
  @Secured(resources.role.edit)
  async resourceChangeRoles(
    @Args({ name: 'changedRoles', type: () => [ChangedRoleArg] }) changedRoles: ChangedRoleArg[],
  ) {
    const res: Resource[] = await this.resourceService.findAll();
    for (const changed of changedRoles) {
      const resource = res.find(r => r.id === changed.resourceId);
      const resourceRole = await resource.roles;

      if (changed.active) {
        const role = await this.roleService.findById(changed.roleId);
        const unique = !resourceRole.some(r => r.id === role.id);
        if (unique) resourceRole.push(role);
      } else {
        const roleIndex = resourceRole.findIndex(r => r.id === changed.roleId);
        if (roleIndex >= 0) {
          resourceRole.splice(roleIndex, 1);
        }
      }
    }

    if (!(await this.resourceService.validate(res))) {
      throw new BadRequestException(apiErrors.input.invalid);
    }
    return this.resourceService.saveMultiple(res);
  }
}

export default ResourceResolver;
