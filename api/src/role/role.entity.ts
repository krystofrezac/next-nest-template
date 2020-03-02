import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import Resource from '../resource/resource.entity';

@ObjectType()
@Entity()
class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field(() => [Resource], { nullable: true })
  @ManyToMany(
    () => Resource,
    resource => resource.roles,
  )
  @JoinTable()
  resources: Promise<Resource[]>;
}

export default Role;
