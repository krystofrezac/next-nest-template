import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ResourceCategory from './resourceCategory.entity';

@Injectable()
class ResourceCategoryService {
  constructor(
    @InjectRepository(ResourceCategory)
    private readonly resourceCategory: Repository<ResourceCategory>,
  ) {}

  async findAll() {
    return this.resourceCategory.find();
  }
}

export default ResourceCategoryService;
