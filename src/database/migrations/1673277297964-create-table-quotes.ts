import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableQuotes1673277297964 implements MigrationInterface {
  name = 'CreateTableQuotes1673277297964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "quotes"
        (
          "id"         uuid NOT NULL DEFAULT uuid_generate_v4(),         
          "language"   character varying,
          "content"    character varying NOT NULL,
          "author"     character varying NOT NULL,
          "tags"       character varying,
          "author_slug"character varying,
          "length"     numeric,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP,
          "created_by" character varying,
          "updated_by" character varying,
          CONSTRAINT "PK_a3ffb1c0c241659fc62907c7433" PRIMARY KEY ("id"),
          CONSTRAINT "UQ_97672ac88f789772dd4797c8b2e" UNIQUE ("content"),
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` ALTER TABLE "quotes"
      DROP CONSTRAINT "UQ_97672ac88f789772dd4797c8b2e"
      DROP CONSTRAINT "PK_a3ffb1c0c241659fc62907c7433"`);
    await queryRunner.query('DROP TABLE "quotes"');
  }
}
