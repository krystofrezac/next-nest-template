import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import UserService from 'user/user.service';
import User from 'user/user.entity';

@Injectable()
class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, plainPassword: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.userService.comparePassword(plainPassword, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}

export default AuthService;
