import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

import Resource from 'resource/resource.entity';
import User from 'user/user.entity';
import FieldGuard from 'auth/field.guard';
import resources from 'config/api/resources';

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

  @FieldGuard(resources.user.seeAll)
  @Field(() => [User], { nullable: true })
  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: Promise<User[]>;
}

export default Role;
