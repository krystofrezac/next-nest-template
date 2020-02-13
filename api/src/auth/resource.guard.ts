import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import UserService from 'user/user.service';

@Injectable()
class ResourceGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    const resources = this.reflector.get<string[]>('resources', context.getHandler());

    if (resources.length === 0) return true;

    const userRoles = (await this.userService.findById(user)).roles;

    if (userRoles === undefined) return false;

    const requestedResources = {};
    resources.forEach(resource => {
      requestedResources[resource] = false;
    });

    userRoles.forEach(role => {
      role.resources.forEach(resource => {
        if (requestedResources[resource.name] !== undefined) {
          requestedResources[resource.name] = true;
        }
      });
    });

    let hasAccess = true;
    Object.keys(requestedResources).forEach(resource => {
      if (!requestedResources[resource]) {
        hasAccess = false;
      }
    });

    return hasAccess;
  }
}

export default ResourceGuard;
