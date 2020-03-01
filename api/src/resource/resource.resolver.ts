import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import Secured from 'auth/secured.guard';
import { Int } from 'type-graphql';
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
    const resources: Resource[] = [];
    for (const changed of changedRoles) {
      if (!resources.some(r => r.id === changed.resourceId))
        resources.push(await this.resourceService.findById(changed.resourceId));
    }
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
    return this.resourceService.saveMultiple(resources);
  }
}

export default ResourceResolver;
