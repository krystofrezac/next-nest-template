import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Role from '../role/role.entity';
import ResourceCategory from '../resourceCategory/resourceCategory.entity';

@ObjectType()
@Entity()
class Resource {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => ResourceCategory, { nullable: true })
  @ManyToOne(
    () => ResourceCategory,
    category => category.resources,
    { nullable: false },
  )
  category: Promise<ResourceCategory>;

  @Field()
  @Column({ default: 0 })
  minimalCount: number;

  @Field(() => [Resource], { nullable: true })
  @ManyToMany(
    () => Resource,
    resource => resource.requiredBy,
  )
  @JoinTable()
  require: Promise<Resource[]>;

  @Field(() => [Resource], { nullable: true })
  @ManyToMany(
    () => Resource,
    resource => resource.require,
  )
  requiredBy: Promise<Resource[]>;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(
    () => Role,
    role => role.resources,
  )
  roles: Promise<Role[]>;
}

export default Resource;
