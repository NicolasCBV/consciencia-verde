import { MigrationInterface, QueryRunner } from "typeorm"

export class AdminMigration1692373281324 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS db.admins (
                id VARCHAR(191) PRIMARY KEY,
                userId VARCHAR(191) NOT NULL,
                createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

                UNIQUE INDEX admin_userId(userId),

                CONSTRAINT fk_user_admin
                FOREIGN KEY (userId)
                REFERENCES db.users(id)
                ON DELETE CASCADE
            ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE db.admins`);
    }

}
