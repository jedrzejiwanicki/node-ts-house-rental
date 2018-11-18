import {MigrationInterface, QueryRunner} from "typeorm";

export class Token1539113391102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_1af105e69b4350d9b89728a52a` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_1af105e69b4350d9b89728a52a6`");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_1af105e69b4350d9b89728a52a` (`emailId`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_1af105e69b4350d9b89728a52a6` FOREIGN KEY (`emailId`) REFERENCES `email`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_1af105e69b4350d9b89728a52a6`");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_1af105e69b4350d9b89728a52a`");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_1af105e69b4350d9b89728a52a6` FOREIGN KEY (`emailId`) REFERENCES `email`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_1af105e69b4350d9b89728a52a` ON `user`(`emailId`)");
    }

}
