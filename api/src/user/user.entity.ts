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

  @Field({ nullable: true })
  @Column({ unique: true })
  @Transform(value => ({ resourceGuard: true, resources: ['testa'], value }))
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
  @Transform((name, obj, transforamtionType) => {
    console.log(this.userService);
    return `${name}a`;
  })
  name: string;

  @Field()
  @Column()
  surname: string;
}

export default User;
