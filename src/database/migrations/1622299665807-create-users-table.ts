import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1622299665807 implements MigrationInterface {
  name = 'CreateUsersTable1622299665807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')");
    await queryRunner.query(`
      CREATE TABLE "users"
      (
        "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
        "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
        "first_name" character varying,
        "last_name"  character varying,
        "username"  character varying,
        "role"       "users_role_enum" NOT NULL DEFAULT 'USER',
        "email"      character varying,
        "phone"      character varying,
        "avatar"     character varying,
        "password"   character varying,
        "modified_password"   character varying,
        "last_login"   TIMESTAMP,
        CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
        CONSTRAINT "UQ_97672ac88f789774dd2727c2be3" UNIQUE ("username"),
        CONSTRAINT "UQ_9767212a8f789774dd2727c2be3" UNIQUE ("phone"),
        CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
      )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "users_role_enum"');
  }
}
