import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import Role from '../role/role.entity';

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: true })
  accessToken: string;

  @Field()
  @Column({ unique: true })
  @Transform(value => ({ resourceGuard: true, value }))
  email: string;

  @Column({ default: true })
  passwordIsHashed: boolean;

  @Column()
  password: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  surname: string;
}

export default User;
