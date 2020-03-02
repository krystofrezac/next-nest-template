import { Args, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import UserPaginator from 'user/paginator/userPaginator.type';
import UserService from 'user/user.service';
import { Int } from 'type-graphql';
import User from 'user/user.entity';
import Secured from '../../auth/secured.guard';
import PaginatorArg from '../../paginator/paginator.arg';

@Resolver(() => UserPaginator)
class UserPaginatorResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserPaginator)
  @Secured()
  async userPaginate() {
    return new UserPaginator();
  }

  @ResolveProperty(() => [User])
  async items(@Args() paginator: PaginatorArg) {
    return this.userService.paginate(paginator.limit, paginator.offset);
  }

  @ResolveProperty(() => Int)
  async totalCount() {
    return this.userService.getTotalCount();
  }
}

export default UserPaginatorResolver;
