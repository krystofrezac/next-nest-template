import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  passwordIsHashed: boolean;

  @Column()
  password: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  surname: string;
}

export default User;
