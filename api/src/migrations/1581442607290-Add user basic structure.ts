import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBasicStructure1581442607290 implements MigrationInterface {
  name = 'AddUserBasicStructure1581442607290';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `passwordIsHashed` tinyint NOT NULL, `password` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `surname` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `user`', undefined);
  }
}
