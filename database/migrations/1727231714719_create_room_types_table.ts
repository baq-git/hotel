import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'room_types';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable();
      table.string('type_name').notNullable();
      table.string('description');
      table.float('price_per_night');
      table.float('price_per_hour');
      table.integer('capacity');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
