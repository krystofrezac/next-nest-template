import {QueryRunner} from 'typeorm';
import ResourceCategory from 'resourceCategory/resourceCategory.entity';
import Resource from 'resource/resource.entity';

const addResource = async (queryRunner: QueryRunner, resourceName: string, resourceDescription: string, resourceCategoryName: string) => {
    const category = await queryRunner.manager
        .getRepository(ResourceCategory)
        .findOne({name: resourceCategoryName});
    const resource = new Resource();
    resource.name = resourceName;
    resource.category = Promise.resolve(category);
    resource.description = resourceDescription;
    await queryRunner.manager.getRepository(Resource).save(resource);
};

export default addResource;
