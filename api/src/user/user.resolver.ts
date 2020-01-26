import { Args, Query } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import User from './user.entity';

class UserResolver {
  @Query(() => User)
  async userGet(@Args({ name: 'password', type: () => String }) password: string) {
    if (password !== 'heslo') throw new UnauthorizedException();
    const u = new User();
    u.id = 123;
    return u;
  }
}

export default UserResolver;
