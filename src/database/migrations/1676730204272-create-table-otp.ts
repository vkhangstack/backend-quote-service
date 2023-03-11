import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOtp1676730204272 implements MigrationInterface {
  name = 'CreateTableOtp1676730204272';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "otp_codes"
        (
          "id"         uuid  NOT NULL DEFAULT uuid_generate_v4(),
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP,
          "created_by" character varying,
          "updated_by" character varying,
          "user_id"    character varying NOT NULL,
          "code"       character varying NOT NULL,
          "is_status"    numeric NOT NULL,
          "is_channel"   character varying NOT NULL,
          "expired_at"  numeric NOT NULL,
          CONSTRAINT "PK_a3f2b1c2c241659fc62907c74" PRIMARY KEY ("id"),
          CONSTRAINT "REL_19f4e08665a1f2bb2bb7d56f3" UNIQUE ("user_id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "otp_codes"');
  }
}
