import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'guests';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('guest_id').primary().notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.date('date_of_birth').nullable();
      table.string('address').nullable();
      table.string('phone').nullable();
      table.string('email').nullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}

