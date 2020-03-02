import { ObjectType } from 'type-graphql';
import User from 'user/user.entity';
import Paginator from 'paginator/paginator.type';

@ObjectType()
class UserPaginator extends Paginator(User) {}

export default UserPaginator;
