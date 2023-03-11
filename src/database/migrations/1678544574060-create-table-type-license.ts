import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTypeLicense1678544574060 implements MigrationInterface {
  name = 'CreateTableTypeLicense1678544574060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "type_license"
        (
          "id"         uuid  NOT NULL DEFAULT uuid_generate_v4(),          
          "type_license"    character varying NOT NULL,
          "name"       character varying NOT NULL,
          "price"    numeric,
          "price_month"    numeric,
          "price_year"    numeric ,
          "price_discount"    numeric ,
          "price_discount_month"    numeric ,
          "price_discount_year"    numeric ,
          "discount"    numeric,
          "discount_month"    numeric,
          "discount_year"    numeric,
          "limit_month"    numeric,
          "limit_day"    numeric,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP,
          "created_by" character varying,
          "updated_by" character varying,
          CONSTRAINT "PK_a3f2b1c2c241659fc62217c74" PRIMARY KEY ("id"),
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "type_license"');
  }
}
