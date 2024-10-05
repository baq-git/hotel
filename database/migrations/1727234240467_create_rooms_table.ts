import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'rooms';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable();
      table.string('room_number');
      table.string('status').defaultTo('Due Out');
      table.integer('hotel_id').unsigned().references('id').inTable('hotels').onDelete('CASCADE');
      table.integer('room_type_id').unsigned().references('id').inTable('room_types');

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
