import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'bookings';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('booking_id');
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
      table.integer('room_id').unsigned().references('id').inTable('rooms').notNullable();
      table.float('total_price').notNullable();
      table.date('checkin_date').notNullable();
      table.date('checkout_date').notNullable();

      table.timestamp('created_at');
      table.timestamp('updated_at');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
