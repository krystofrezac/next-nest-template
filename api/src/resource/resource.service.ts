import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import Resource from 'resource/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class ResourceService {
  constructor(
    @InjectRepository(Resource) private readonly resourceRepository: Repository<Resource>,
  ) {}

  async findAll() {
    return this.resourceRepository.find();
  }
}

export default ResourceService;
