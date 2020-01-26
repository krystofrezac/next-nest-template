import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  id: number;
}

export default User;
