import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'bookings';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('booking_id');
      table.integer('guest_id').unsigned().references('guest_id').inTable('guests').notNullable();
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

