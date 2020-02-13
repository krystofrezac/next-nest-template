import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import Resource from '../resource/resource.entity';

@ObjectType()
@Entity()
class Role {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Resource], { nullable: true })
  @ManyToMany(() => Resource)
  @JoinTable()
  resources: Resource[];
}

export default Role;
