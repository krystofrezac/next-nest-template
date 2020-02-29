import { Field, InputType } from 'type-graphql';

@InputType()
class ChangedResourcesArg {
  @Field()
  resourceId: number;

  @Field()
  roleId: number;

  @Field()
  active: boolean;
}

export default ChangedResourcesArg;
