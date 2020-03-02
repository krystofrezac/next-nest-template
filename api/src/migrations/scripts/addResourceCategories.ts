import {QueryRunner} from "typeorm";
import addResourceCategory from "./addResourceCategory";

const addResourceCategories = async (queryRunner: QueryRunner, resourceCategoryNames: string[]) => {
    for (const category of resourceCategoryNames) {
        await addResourceCategory(queryRunner, category);
    }
};

export default addResourceCategories;