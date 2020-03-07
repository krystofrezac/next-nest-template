import { Args, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import UserPaginator from 'user/paginator/userPaginator.type';
import UserService from 'user/user.service';
import { Int } from 'type-graphql';
import User from 'user/user.entity';
import UserFilterArg, { getUserFilterArgDefaultValue } from 'user/paginator/args/userFilter.arg';
import OrderByArg from '../../paginator/orderBy.arg';
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
  async items(
    @Args() paginator: PaginatorArg,
    @Args({
      name: 'filter',
      type: () => UserFilterArg,
      nullable: true,
      defaultValue: getUserFilterArgDefaultValue(),
    })
    filter: UserFilterArg,
    @Args({ name: 'orderBy', type: () => OrderByArg, nullable: true })
    orderBy: OrderByArg,
  ) {
    return this.userService.paginate(paginator.limit, paginator.offset, filter, orderBy);
  }

  @ResolveProperty(() => Int)
  async totalCount(
    @Args({
      name: 'filter',
      type: () => UserFilterArg,
      nullable: true,
      defaultValue: getUserFilterArgDefaultValue(),
    })
    filter: UserFilterArg,
  ) {
    return this.userService.getTotalCount(filter);
  }
}

export default UserPaginatorResolver;
