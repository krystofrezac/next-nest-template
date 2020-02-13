import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';

import AuthService from 'auth/auth.service';
import CurrentUserDecorator from 'auth/currentUser.decorator';
import GqlAuthGuard from 'auth/jwt.guard';
import User from 'user/user.entity';
import UserService from 'user/user.service';
import ResourceGuard from '../auth/resource.guard';
import Secured from '../auth/secured.guard';

@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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

  @Mutation(() => User)
  async userRegister(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'surname', type: () => String }) surname: string,
  ) {
    const user = new User();
    user.email = email;
    user.password = await this.userService.hashPassword(password);
    user.name = name;
    user.surname = surname;

    return this.userService.save(user);
  }

  @Query(() => User)
  @Secured(['ADMIN'])
  async userGetLogged(@CurrentUserDecorator() userId: number) {
    return this.userService.findById(userId);
  }
}

export default UserResolver;
