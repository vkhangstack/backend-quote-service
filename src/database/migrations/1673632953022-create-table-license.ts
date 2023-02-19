import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLicense1673632953022 implements MigrationInterface {
  name = 'CreateTableLicense1673632953022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "licenses"
        (
          "id"         uuid  NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP,
          "created_by" character varying,
          "updated_by" character varying,
          "user_id"    character varying,
          "license_key" character varying,
          "license_token" character varying,
          "name_type" character varying,
          "type_license" numeric,
          "expires"    numeric,
          "day_expire" numeric,
          "status" numeric,
          CONSTRAINT "PK_a3f2b1ccc241659fc62907c7433" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "licenses"');
  }
}
