import {MigrationInterface, QueryRunner} from "typeorm";

export class AddResourceDetails1582892254562 implements MigrationInterface {
    name = 'AddResourceDetails1582892254562'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `resource_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `resource_require_resource` (`resourceId_1` int NOT NULL, `resourceId_2` int NOT NULL, INDEX `IDX_1292d673ee5ad7c03d1d86f872` (`resourceId_1`), INDEX `IDX_e974ddfce268ed5a508b2bb9ed` (`resourceId_2`), PRIMARY KEY (`resourceId_1`, `resourceId_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `resource` ADD `minimalCount` int NOT NULL DEFAULT 0", undefined);
        await queryRunner.query("ALTER TABLE `resource` ADD `categoryId` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `resource` ADD CONSTRAINT `FK_66faacb332a925bf732256594e5` FOREIGN KEY (`categoryId`) REFERENCES `resource_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `resource_require_resource` ADD CONSTRAINT `FK_1292d673ee5ad7c03d1d86f8721` FOREIGN KEY (`resourceId_1`) REFERENCES `resource`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `resource_require_resource` ADD CONSTRAINT `FK_e974ddfce268ed5a508b2bb9ed9` FOREIGN KEY (`resourceId_2`) REFERENCES `resource`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`", undefined);
        await queryRunner.query("ALTER TABLE `resource_require_resource` DROP FOREIGN KEY `FK_e974ddfce268ed5a508b2bb9ed9`", undefined);
        await queryRunner.query("ALTER TABLE `resource_require_resource` DROP FOREIGN KEY `FK_1292d673ee5ad7c03d1d86f8721`", undefined);
        await queryRunner.query("ALTER TABLE `resource` DROP FOREIGN KEY `FK_66faacb332a925bf732256594e5`", undefined);
        await queryRunner.query("ALTER TABLE `resource` DROP COLUMN `categoryId`", undefined);
        await queryRunner.query("ALTER TABLE `resource` DROP COLUMN `minimalCount`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP TABLE `user_roles_role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e974ddfce268ed5a508b2bb9ed` ON `resource_require_resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_1292d673ee5ad7c03d1d86f872` ON `resource_require_resource`", undefined);
        await queryRunner.query("DROP TABLE `resource_require_resource`", undefined);
        await queryRunner.query("DROP TABLE `resource_category`", undefined);
    }

}
