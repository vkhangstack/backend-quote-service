import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableLicense1673632953022 implements MigrationInterface {
  name = 'CreateTableLicense1673632953022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "licenses"
        (
          "id"         uuid  NOT NULL DEFAULT uuid_generate_v4(),         
          "user_id"    character varying,
          "type_license_id" character varying,
          "day_expire" numeric,
          "expires"    numeric,
          "status" numeric,
          "license_key" character varying,
          "license_token" character varying,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP,
          "created_by" character varying,
          "updated_by" character varying,
          CONSTRAINT "PK_a3f2b1ccc241659fc62907c7433" PRIMARY KEY ("id")
        )`);

    // await queryRunner.query(`ALTER TABLE "licenses"
    //   ADD CONSTRAINT "FK_19f4e08665a1f4bbbb7d5631f35" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "licenses"');
  }
}
