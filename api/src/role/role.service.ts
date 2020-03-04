import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Role from './role.entity';

@Injectable()
class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {}

  async save(role: Role) {
    return this.roleRepository.save(role);
  }

  async saveMultiple(roles: Role[]) {
    return this.roleRepository.save(roles);
  }

  async remove(role: Role) {
    return this.roleRepository.remove(role);
  }

  async findAll() {
    return this.roleRepository.find();
  }

  async findById(roleId: number) {
    return this.roleRepository.findOne(roleId);
  }
}

export default RoleService;
