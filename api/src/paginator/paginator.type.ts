import { ClassType, Field, Int, ObjectType } from 'type-graphql';

function Paginator<TNodeType>(NodeType: ClassType<TNodeType>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatorType {
    @Field(() => NodeType)
    items: TNodeType[];

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatorType;
}

export default Paginator;
