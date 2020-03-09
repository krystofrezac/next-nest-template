import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from 'role/role.entity';

@ObjectType()
@Entity()
class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ default: true })
  active: boolean;

  @Field()
  @Column()
  createTime: Date;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  passwordIsHashed: boolean;

  @Column()
  password: string;

  @Field({ nullable: true })
  generatedPassword: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(
    () => Role,
    role => role.users,
  )
  @JoinTable()
  roles: Promise<Role[]>;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  surname: string;

  @Field()
  @Column({ default: false })
  darkTheme: boolean;
}

export default User;
