import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { compare, hash } from 'bcrypt';

import User from 'user/user.entity';
import apiConfig from 'config/api';
import UserFilterArg from 'user/paginator/args/userFilter.arg';
import { generate } from 'generate-password';
import OrderByArg from '../paginator/orderBy.arg';

@Injectable()
class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async save(user: User) {
    return this.userRepository.save(user);
  }

  async findById(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async paginate(limit: number, offset: number, filter: UserFilterArg, orderBy?: OrderByArg) {
    const order = orderBy ? { [orderBy.fieldName]: orderBy.type } : {};
    return this.userRepository.find({
      take: limit,
      skip: offset,
      where: {
        email: Like(`%${filter.email}%`),
        name: Like(`%${filter.name}%`),
        surname: Like(`%${filter.surname}%`),
      },
      order,
    });
  }

  async getTotalCount(filter?: UserFilterArg) {
    return this.userRepository.count({
      where: filter
        ? {
            email: Like(`%${filter.email}%`),
            name: Like(`%${filter.name}%`),
            surname: Like(`%${filter.surname}%`),
          }
        : {},
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async comparePassword(plain: string, hashed: string) {
    return compare(plain, hashed);
  }

  async hashPassword(plain: string) {
    return hash(plain, apiConfig.hash.saltRounds);
  }

  async generatePassword() {
    const generatedPassword = generate({ length: 10, numbers: true });
    const hashedPassword = await this.hashPassword(generatedPassword);
    return { plainPassword: generatedPassword, hashedPassword };
  }
}

export default UserService;
