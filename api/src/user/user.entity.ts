import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  accessToken: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
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
