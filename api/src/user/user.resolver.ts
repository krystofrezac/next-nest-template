import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Int } from 'type-graphql';
import { generate } from 'generate-password';

import Secured from 'auth/secured.guard';
import AuthService from 'auth/auth.service';
import CurrentUser from 'auth/currentUser.decorator';
import User from 'user/user.entity';
import UserService from 'user/user.service';
import { emailRegex } from 'config/regexs';
import RoleService from '../role/role.service';

@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
  ) {}

  @Query(() => User)
  async userLogin(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) plainPassword: string,
  ) {
    const user = await this.authService.validateUser(email, plainPassword);
    if (user) {
      user.accessToken = await this.authService.login(user);
      return user;
    }

    throw new UnauthorizedException();
  }

  @Query(() => User)
  @Secured()
  async userGetLogged(@CurrentUser() userId: number) {
    return this.userService.findById(userId);
  }

  @Query(() => User)
  @Secured()
  async userFindById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  @Secured()
  async userRegister(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('surname') surname: string,
  ) {
    const generatedPassword = generate({ length: 10, numbers: true });
    if (!emailRegex.test(email)) {
      throw new BadRequestException();
    }
    const user = new User();
    user.email = email;
    user.password = await this.userService.hashPassword(generatedPassword);
    user.generatedPassword = generatedPassword;
    user.name = name;
    user.surname = surname;

    return this.userService.save(user);
  }

  @Mutation(() => User)
  async userChangeRoles(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args({ name: 'rolesIds', type: () => [Int] }) rolesIds: number[],
  ) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException();
    const userRoles = [];

    for (const roleId of rolesIds) {
      const role = await this.roleService.findById(roleId);
      if (!role) throw new BadRequestException();
      userRoles.push(role);
    }

    user.roles = Promise.resolve(userRoles);
    return this.userService.save(user);
  }
}

export default UserResolver;
