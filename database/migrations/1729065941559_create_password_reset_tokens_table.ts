import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'password_reset_tokens';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('type').notNullable();
      table.string('token', 64).notNullable();

      table.timestamp('expires_at', { precision: 6, useTz: true });
      table.timestamp('created_at', { precision: 6, useTz: true }).notNullable();
      table.timestamp('updated_at', { precision: 6, useTz: true }).notNullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
