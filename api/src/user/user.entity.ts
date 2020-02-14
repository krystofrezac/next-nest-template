import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import UserService from 'user/user.service';
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
