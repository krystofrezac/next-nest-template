import { Field, InputType } from 'type-graphql';

@InputType()
class ChangedRoleArg {
  @Field()
  resourceId: number;

  @Field()
  roleId: number;

  @Field()
  active: boolean;
}

export default ChangedRoleArg;
