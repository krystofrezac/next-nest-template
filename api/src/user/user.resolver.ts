import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';

import Secured from 'auth/secured.guard';
import AuthService from 'auth/auth.service';
import CurrentUser from 'auth/currentUser.decorator';
import User from 'user/user.entity';
import UserService from 'user/user.service';
import UserPaginator from 'user/userPaginate.type';
import PaginateArg from 'user/args/paginate.arg';

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
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('surname') surname: string,
  ) {
    const user = new User();
    user.email = email;
    user.password = await this.userService.hashPassword(password);
    user.name = name;
    user.surname = surname;

    return this.userService.save(user);
  }

  @Query(() => User)
  @Secured()
  async userGetLogged(@CurrentUser() userId: number) {
    return this.userService.findById(userId);
  }

  @Query(() => UserPaginator)
  @Secured()
  async userPaginate(@Args({ name: 'paginator', type: () => PaginateArg }) paginator: PaginateArg) {
    const userPaginator = new UserPaginator();
    userPaginator.items = [await this.userService.findById(1)];
    userPaginator.totalCount = await this.userService.getTotalCount();
    return userPaginator;
  }
}

export default UserResolver;
