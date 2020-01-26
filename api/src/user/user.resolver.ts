import { Query } from '@nestjs/graphql';
import User from './user.entity';

class UserResolver {
  @Query(() => User)
  async userGet() {
    const u = new User();
    u.id = 123;
    return u;
  }
}

export default UserResolver;
