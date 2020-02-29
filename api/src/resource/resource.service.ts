import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import Resource from 'resource/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}

export default ResourceService;
