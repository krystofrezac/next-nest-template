import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import UserService from 'user/user.service';
import User from 'user/user.entity';

@Injectable()
class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (
      user &&
      user.passwordIsHashed &&
      (await this.userService.comparePassword(plainPassword, user.password))
    ) {
      return user;
    }
    if (user && !user.passwordIsHashed && plainPassword === user.password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async hasAccess(userId: number, resources: string[]) {
    if (resources.length === 0) return true;

    const userRoles = await (await this.userService.findById(userId)).roles;

    if (userRoles === undefined) return false;

    const requestedResources = {};
    resources.forEach(resource => {
      requestedResources[resource] = false;
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const roleKey of Object.keys(userRoles)) {
      const role = userRoles[roleKey];
      // eslint-disable-next-line no-await-in-loop
      (await role.resources).forEach(resource => {
        if (requestedResources[resource.name] !== undefined) {
          requestedResources[resource.name] = true;
        }
      });
    }

    let hasAccess = true;
    Object.keys(requestedResources).forEach(resource => {
      if (!requestedResources[resource]) {
        hasAccess = false;
      }
    });

    return hasAccess;
  }
}

export default AuthService;
