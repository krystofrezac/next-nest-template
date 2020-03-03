import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import Role from 'role/role.entity';

@ObjectType()
@Entity()
class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  passwordIsHashed: boolean;

  @Column()
  password: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Promise<Role[]>;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  surname: string;
}

export default User;
