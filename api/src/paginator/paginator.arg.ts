import { Field, InputType, Int } from 'type-graphql';

@InputType({ isAbstract: true })
class PaginatorArg {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;
}

export default PaginatorArg;
