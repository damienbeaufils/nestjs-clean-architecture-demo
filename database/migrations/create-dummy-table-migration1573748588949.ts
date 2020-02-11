import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDummyTableMigration1573748588949 implements MigrationInterface {
  name: string = 'CreateDummyTableMigration1573748588949';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dummy',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'value',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dummy');
  }
}
