import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import User from 'user/user.entity';

@Injectable()
class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async userSave(user: User) {
    return this.userRepository.save(user);
  }

  async hashPassword(password: string) {
    return hash(password, 6);
  }
}

export default UserService;
