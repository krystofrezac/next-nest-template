import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Int } from 'type-graphql';

import Secured from 'auth/secured.guard';
import AuthService from 'auth/auth.service';
import CurrentUser from 'auth/currentUser.decorator';
import User from 'user/user.entity';
import UserService from 'user/user.service';
import { emailRegex } from 'config/regexs';
import RoleService from 'role/role.service';
import apiErrors from 'config/apiErrors';

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

    if (!user) throw new UnauthorizedException();
    if (!user.active) throw new UnauthorizedException();

    user.accessToken = await this.authService.login(user);
    user.lastLoginTime = new Date(Date.now());
    return this.userService.save(user);
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
  async userRegister(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('surname') surname: string,
  ) {
    if (!emailRegex.test(email)) {
      throw new BadRequestException();
    }

    const { plainPassword, hashedPassword } = await this.userService.generatePassword();
    const user = new User();
    user.createTime = new Date(Date.now());
    user.email = email;
    user.password = hashedPassword;
    user.generatedPassword = plainPassword;
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

  @Mutation(() => User)
  @Secured()
  async userResetPassword(@Args({ name: 'userId', type: () => Int }) userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException();

    const { plainPassword, hashedPassword } = await this.userService.generatePassword();

    user.password = hashedPassword;
    user.generatedPassword = plainPassword;
    user.passwordIsHashed = true;

    return this.userService.save(user);
  }

  @Mutation(() => User)
  @Secured()
  async userResetMyPassword(
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
    @CurrentUser() userId: number,
  ) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException();
    if (!(await this.userService.comparePassword(oldPassword, user.password))) {
      throw new BadRequestException(apiErrors.input.invalid);
    }

    user.password = await this.userService.hashPassword(newPassword);
    user.passwordIsHashed = true;

    return this.userService.save(user);
  }

  @Mutation(() => User)
  @Secured()
  async userChangeActive(
    @Args({ name: 'userId', type: () => Int }) userId: number,
    @Args('active') active: boolean,
  ) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException();
    user.active = active;
    return this.userService.save(user);
  }

  @Mutation(() => User)
  @Secured()
  async userChangeDarkTheme(@Args('darkTheme') darkTheme: boolean, @CurrentUser() userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException();
    user.darkTheme = darkTheme;
    return this.userService.save(user);
  }
}

export default UserResolver;
