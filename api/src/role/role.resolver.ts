import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import Secured from 'auth/secured.guard';

import { BadRequestException } from '@nestjs/common';
import RoleService from './role.service';
import Role from './role.entity';
import ChangedResourcesArg from './args/changedResources.arg';
import ResourceService from '../resource/resource.service';

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

  @Mutation(() => [Role])
  @Secured()
  async roleChangeResources(
    @Args({ name: 'changedResources', type: () => [ChangedResourcesArg] })
    changedResources: ChangedResourcesArg[],
  ) {
    const roles = await this.roleService.findAll();
    for (const changed of changedResources) {
      const role = roles.find(r => r.id === changed.roleId);
      if (!role) {
        throw new BadRequestException();
      }

      const roleResources = await role.resources;

      if (!changed.active) {
        const resourceIndex = roleResources.findIndex(r => r.id === changed.resourceId);
        if (resourceIndex >= 0) {
          roleResources.splice(resourceIndex, 1);
        }
      } else {
        const resource = await this.resourceService.findById(changed.resourceId);
        const unique = !roleResources.some(r => r.id === resource.id);
        if (resource && unique) {
          roleResources.push(resource);
        }
      }
    }
    return this.roleService.saveMultiple(roles);
  }
}

export default RoleResolver;
