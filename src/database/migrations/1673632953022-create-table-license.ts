import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLicense1673632953022 implements MigrationInterface {
  name = 'createLicenseTable1622299662707';

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
          "licenseKey" character varying,
          "licenseToken" character varying,
          "expires"    numeric,
          "day_expire" numeric,
          "type_license" numeric,
          "status" numeric,
          CONSTRAINT "PK_a3f2b1ccc241659fc62907c7433" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "licenses"');
  }
}
