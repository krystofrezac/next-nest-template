import {MigrationInterface, QueryRunner} from "typeorm";
import addResourceCategories from "./scripts/addResourceCategories";
import addResources from "./scripts/addResources";
import removeResources from "./scripts/removeResources";

export class AddInitResources1585925669072 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await addResourceCategories(queryRunner, [{name: "ROLE", label: "Role"}, {name: "USER", label: "Uživatel"}])
        await addResources(queryRunner, [{
            name: "ROLE_EDIT",
            categoryName: "ROLE",
            minimalCount: 1,
            label: "Editace rolí",
            description: "Editace rolí/zdrojů"
        }, {
            name: "USER_SEE_ALL",
            categoryName: "USER",
            minimalCount: 1,
            label: "Zobrazení všech uživatelů",
            description: "Zobrazení všech uživatelů"
        }, {
            name: "USER_ASSIGN_ROLE",
            categoryName: "USER",
            minimalCount: 1,
            label: "Přiřazování rolí",
            description: "Přiřazování rolí uživatelům",
            requiredResource: ["USER_SEE_ALL"]
        }, {
            name: "USER_ADD",
            categoryName: "USER",
            minimalCount: 0,
            label: "Přidávání uživatelů",
            description: "Přidávání uživatelů"
        }, {
            name: "USER_ACTIVATE",
            categoryName: "USER",
            minimalCount: 0,
            label: "Aktivace uživatelů",
            description: "Aktivace/deaktivace uživatelů",
            requiredResource: ["USER_SEE_ALL"]
        }, {
            name: "USER_EDIT",
            categoryName: "USER",
            minimalCount: 0,
            label: "Editace uživatelů",
            description: "Editace uživatelů",
            requiredResource: ["USER_SEE_ALL"]
        }, {
            name: "USER_GENERATE_PASSWORD",
            categoryName: "USER",
            minimalCount: 0,
            label: "Generování hesla",
            description: "Generování nového náhodného hesla uživatelům",
            requiredResource: ["USER_SEE_ALL"]
        }])
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await removeResources(queryRunner, ["ROLE_EDIT", "USER_SEE_ALL", "USER_ASSIGN_ROLE", "USER_ADD",
            "USER_ACTIVATE", "USER_EDIT", "USER_GENERATE_PASSWORD"])
    }

}
