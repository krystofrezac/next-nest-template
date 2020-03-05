import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import Resource from 'resource/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import apiErrors from '../config/apiErrors';

@Injectable()
class ResourceService {
  constructor(
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>,
  ) {}

  async save(resource: Resource) {
    return this.resourceRepository.save(resource);
  }

  async saveMultiple(resources: Resource[]) {
    return this.resourceRepository.save(resources);
  }

  async findAll() {
    return this.resourceRepository.find();
  }

  async findById(id: number) {
    return this.resourceRepository.findOne(id);
  }

  async validate(resources: Resource[]) {
    for (const resource of resources) {
      const resourceRoles = await resource.roles;
      const requiredResources = await resource.requires;

      if (resource.minimalCount > resourceRoles.length) {
        throw new BadRequestException(apiErrors.input.invalid);
      }

      for (const role of resourceRoles) {
        for (const requiredResource of requiredResources) {
          const a = resources.find(r => r.id === requiredResource.id);
          if (!(await a.roles).some(r => r.id === role.id)) {
            throw new BadRequestException(apiErrors.input.invalid);
          }
        }
      }
    }
  }
}

export default ResourceService;
