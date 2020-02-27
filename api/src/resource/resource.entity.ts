import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Role from '../role/role.entity';

@ObjectType()
@Entity()
class Resource {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(
    () => Role,
    role => role.resources,
  )
  roles: Promise<Role[]>;
}

export default Resource;
