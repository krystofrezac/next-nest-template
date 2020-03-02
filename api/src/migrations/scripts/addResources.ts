import {QueryRunner} from "typeorm";
import addResource from "./addResource";

const addResources = async (queryRunner: QueryRunner, resources: { name: string, description: string, categoryName: string }[]) => {
    for (const resource of resources) {
        await addResource(queryRunner, resource.name, resource.description, resource.categoryName);
    }
};

export default addResources;