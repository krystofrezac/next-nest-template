import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Resource from 'resource/resource.entity';

@ObjectType()
@Entity()
class ResourceCategory {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Resource])
  @OneToMany(
    () => Resource,
    resource => resource.category,
  )
  resources: Promise<Resource[]>;
}

export default ResourceCategory;
