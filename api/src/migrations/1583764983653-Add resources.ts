import {MigrationInterface, QueryRunner} from "typeorm";

import addResources from "./scripts/addResources";
import addResourceCategories from "./scripts/addResourceCategories";
import removeResources from "./scripts/removeResources";
import removeResourceCategories from "./scripts/removeResourceCategories";

export class AddResources1583764983653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await addResourceCategories(queryRunner, ["ROLE", "USER"]);
        await addResources(queryRunner, [{
            name: "ROLE_EDIT",
            description: "Editace, vytváření a mazání rolý.",
            categoryName: "ROLE",
            minimalCount: 1,
        }, {
            name: "USER_SEE_ALL",
            description: "Zobrazení všech uživatelů.",
            categoryName: "USER",
            minimalCount: 1,
        }, {
            name: "USER_ADD",
            description: "Přidávání uživatelů.",
            categoryName: "USER",
            minimalCount: 1,
        }, {
            name: "USER_ACTIVATE",
            description: "Aktivace a deaktivace uživatelů.",
            categoryName: "USER",
            minimalCount: 1,
            requiredResource: ["USER_SEE_ALL"]
        }, {
            name: "USER_GENERATE_PASSWORD",
            description: "Generování nového heslo pro uživatele.",
            categoryName: "USER",
            minimalCount: 1,
            requiredResource: ["USER_SEE_ALL"]
        }, {
            name: "USER_ASSIGN_ROLE",
            description: "Přiřazení rolí uživateli.",
            categoryName: "USER",
            minimalCount: 1,
            requiredResource: ["USER_SEE_ALL"]
        }]);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await removeResources(queryRunner, ["USER_ASSIGN_ROLE", "USER_GENERATE_PASSWORD", "USER_ACTIVATE",
            "USER_ADD", "USER_SEE_ALL", "ROLE_EDIT"]);
        await removeResourceCategories(queryRunner,["ROLE", "USER"]);
    }

}
