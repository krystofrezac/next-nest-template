import { ArgsType, Field, InputType, Int } from 'type-graphql';

@ArgsType()
class PaginatorArg {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;
}

export default PaginatorArg;
