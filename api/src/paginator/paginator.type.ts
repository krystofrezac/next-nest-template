import { ClassType, Field, Int, ObjectType } from 'type-graphql';

function Paginator<TNodeType>(NodeType: ClassType<TNodeType>) {
  @ObjectType({ isAbstract: true })
  abstract class EdgeType {
    @Field(() => NodeType)
    items: TNodeType[];

    @Field(() => Int)
    totalCount: number;
  }
  return EdgeType;
}

export default Paginator;
