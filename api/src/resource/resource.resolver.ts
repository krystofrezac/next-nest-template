import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Int } from 'type-graphql';

import Secured from 'auth/secured.guard';

import ResourceService from './resource.service';
import Resource from './resource.entity';
import ChangedRoleArg from './args/changedRole.arg';
import RoleService from '../role/role.service';

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
  @Secured()
  async resourceChangeRoles(
    @Args({ name: 'changedRoles', type: () => [ChangedRoleArg] }) changedRoles: ChangedRoleArg[],
  ) {
    const resources: Resource[] = await this.resourceService.findAll();
    for (const changed of changedRoles) {
      const resource = resources.find(r => r.id === changed.resourceId);
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
    for (const resource of resources) {
      console.log('resource', resource);
      console.log('resource requires', await resource.requires);
      console.log('resource roles', await resource.roles);
      console.log('----------------------');
    }
    await this.resourceService.validate(resources);
    return this.resourceService.saveMultiple(resources);
  }
}

export default ResourceResolver;
