import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { compare, hash } from 'bcrypt';

import User from 'user/user.entity';
import apiConfig from 'config/api';
import UserFilterArg from 'user/paginator/args/userFilter.arg';

@Injectable()
class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async save(user: User) {
    return this.userRepository.save(user);
  }

  async findById(userId: number) {
    return this.userRepository.findOne(userId);
  }

  async paginate(limit: number, offset: number, filter: UserFilterArg) {
    return this.userRepository.find({
      take: limit,
      skip: offset,
      where: {
        email: Like(`%${filter.email}%`),
        name: Like(`%${filter.name}%`),
        surname: Like(`%${filter.surname}%`),
      },
    });
  }

  async getTotalCount() {
    return this.userRepository.count();
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
}

export default UserService;
