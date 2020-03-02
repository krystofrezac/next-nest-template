import {QueryRunner} from "typeorm";
import ResourceCategory from "../../resourceCategory/resourceCategory.entity";

const addResourceCategory = async (queryRunner: QueryRunner, resourceCategoryName: string) => {
    const resourceCategoryRepository = queryRunner.manager.getRepository(ResourceCategory);
    const category = new ResourceCategory();
    category.name = resourceCategoryName;
    await resourceCategoryRepository.save(category)
};

export default addResourceCategory