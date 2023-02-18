import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableQuotes1673277297964 implements MigrationInterface {
  name = 'CreateTableQuotes1673277297964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "quotes"
        (
          "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP         NOT NULL,
          "language"   character varying,
          "content"    character varying,
          "author"     character varying,
          "tags"       character varying,
          "author_slug"character varying,
          "length"     numeric,
          CONSTRAINT "UQ_97672ac88f789772dd4797c8b2e" UNIQUE ("content"),
          CONSTRAINT "PK_a3ffb1c0c241659fc62907c7433" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` ALTER TABLE "quotes"
      DROP CONSTRAINT "UQ_97672ac88f789772dd4797c8b2e"
      DROP CONSTRAINT "PK_a3ffb1c0c241659fc62907c7433"`);
    await queryRunner.query('DROP TABLE "quotes"');
  }
}
