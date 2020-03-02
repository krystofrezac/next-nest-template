import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import User from 'user/user.entity';
import apiConfig from 'config/api';

@Injectable()
class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async save(user: User) {
    return this.userRepository.save(user);
  }

  async findById(userId: number) {
    return this.userRepository.findOne(userId);
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
