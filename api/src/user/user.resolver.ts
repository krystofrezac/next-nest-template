import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';

import User from 'user/user.entity';
import UserService from 'user/user.service';

@Resolver()
class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async userGet(@Args({ name: 'password', type: () => String }) password: string) {
    if (password !== 'heslo') throw new UnauthorizedException();
    const u = new User();
    u.id = 123;
    return u;
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

    return this.userService.userSave(user);
  }
}

export default UserResolver;
