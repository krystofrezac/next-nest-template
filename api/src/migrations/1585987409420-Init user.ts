import {MigrationInterface, QueryRunner} from "typeorm";

import Resource from "resource/resource.entity";
import Role from "role/role.entity";
import User from "user/user.entity";

export class InitUser1585987409420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const resourceRepository = queryRunner.manager.getRepository(Resource);
        const roleRepository = queryRunner.manager.getRepository(Role);
        const userRepository = queryRunner.manager.getRepository(User);

        const roleEdit = await resourceRepository.findOne({name: "ROLE_EDIT"});
        const userSeeAll = await resourceRepository.findOne({name: "USER_SEE_ALL"});
        const userAssignRole = await resourceRepository.findOne({name: "USER_ASSIGN_ROLE"});

        let role = new Role();
        role.resources = Promise.resolve([roleEdit, userSeeAll, userAssignRole]);
        role.name = "ADMIN";
        role = await roleRepository.save(role);


        const user = new User();
        user.email = "admin@admin.cz";
        user.password = "admin";
        user.passwordIsHashed = false;
        user.name = "Igor";
        user.surname = "Hnízdo";
        user.roles = Promise.resolve([role]);
        user.createTime = new Date(Date.now());
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const roleRepository = queryRunner.manager.getRepository(Role);
        const userRepository = queryRunner.manager.getRepository(User);

        await userRepository.delete({email: "admin@admin.cz"});
        await roleRepository.delete({name: "ADMIN"});
    }
}

