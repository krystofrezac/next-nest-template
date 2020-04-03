import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1585925638160 implements MigrationInterface {
    name = 'Init1585925638160'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `active` tinyint NOT NULL DEFAULT 1, `createTime` datetime NOT NULL, `lastLoginTime` datetime NULL, `email` varchar(255) NOT NULL, `passwordIsHashed` tinyint NOT NULL DEFAULT 1, `password` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, `darkTheme` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `maxUsers` int NOT NULL DEFAULT 99999, UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `resource_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `label` varchar(255) NOT NULL, UNIQUE INDEX `IDX_31c872a2e333ee155d60ccd454` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `resource` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `label` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `minimalCount` int NOT NULL DEFAULT 0, `categoryId` int NOT NULL, UNIQUE INDEX `IDX_c8ed18ff47475e2c4a7bf59daa` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user_roles_role` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_5f9286e6c25594c6b88c108db7` (`userId`), INDEX `IDX_4be2f7adf862634f5f803d246b` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `role_resources_resource` (`roleId` int NOT NULL, `resourceId` int NOT NULL, INDEX `IDX_5c4b4c9b01b043a8ea20176e5f` (`roleId`), INDEX `IDX_f00890ff7ebee1a10632b353d2` (`resourceId`), PRIMARY KEY (`roleId`, `resourceId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `resource_requires_resource` (`resourceId_1` int NOT NULL, `resourceId_2` int NOT NULL, INDEX `IDX_84a0d1f23c3ab01c567194b083` (`resourceId_1`), INDEX `IDX_6c8f144bce7b3eb6ac207c2e75` (`resourceId_2`), PRIMARY KEY (`resourceId_1`, `resourceId_2`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `resource` ADD CONSTRAINT `FK_66faacb332a925bf732256594e5` FOREIGN KEY (`categoryId`) REFERENCES `resource_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `role_resources_resource` ADD CONSTRAINT `FK_5c4b4c9b01b043a8ea20176e5ff` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `role_resources_resource` ADD CONSTRAINT `FK_f00890ff7ebee1a10632b353d28` FOREIGN KEY (`resourceId`) REFERENCES `resource`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `resource_requires_resource` ADD CONSTRAINT `FK_84a0d1f23c3ab01c567194b0833` FOREIGN KEY (`resourceId_1`) REFERENCES `resource`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `resource_requires_resource` ADD CONSTRAINT `FK_6c8f144bce7b3eb6ac207c2e751` FOREIGN KEY (`resourceId_2`) REFERENCES `resource`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `resource_requires_resource` DROP FOREIGN KEY `FK_6c8f144bce7b3eb6ac207c2e751`", undefined);
        await queryRunner.query("ALTER TABLE `resource_requires_resource` DROP FOREIGN KEY `FK_84a0d1f23c3ab01c567194b0833`", undefined);
        await queryRunner.query("ALTER TABLE `role_resources_resource` DROP FOREIGN KEY `FK_f00890ff7ebee1a10632b353d28`", undefined);
        await queryRunner.query("ALTER TABLE `role_resources_resource` DROP FOREIGN KEY `FK_5c4b4c9b01b043a8ea20176e5ff`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_4be2f7adf862634f5f803d246b8`", undefined);
        await queryRunner.query("ALTER TABLE `user_roles_role` DROP FOREIGN KEY `FK_5f9286e6c25594c6b88c108db77`", undefined);
        await queryRunner.query("ALTER TABLE `resource` DROP FOREIGN KEY `FK_66faacb332a925bf732256594e5`", undefined);
        await queryRunner.query("DROP INDEX `IDX_6c8f144bce7b3eb6ac207c2e75` ON `resource_requires_resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_84a0d1f23c3ab01c567194b083` ON `resource_requires_resource`", undefined);
        await queryRunner.query("DROP TABLE `resource_requires_resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_f00890ff7ebee1a10632b353d2` ON `role_resources_resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5c4b4c9b01b043a8ea20176e5f` ON `role_resources_resource`", undefined);
        await queryRunner.query("DROP TABLE `role_resources_resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_4be2f7adf862634f5f803d246b` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_5f9286e6c25594c6b88c108db7` ON `user_roles_role`", undefined);
        await queryRunner.query("DROP TABLE `user_roles_role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c8ed18ff47475e2c4a7bf59daa` ON `resource`", undefined);
        await queryRunner.query("DROP TABLE `resource`", undefined);
        await queryRunner.query("DROP INDEX `IDX_31c872a2e333ee155d60ccd454` ON `resource_category`", undefined);
        await queryRunner.query("DROP TABLE `resource_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ae4578dcaed5adff96595e6166` ON `role`", undefined);
        await queryRunner.query("DROP TABLE `role`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
