import { BaseSchema } from '@adonisjs/lucid/schema';
import { DateTime } from 'luxon';

export default class extends BaseSchema {
  protected tableName = 'hotels';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('phone').notNullable();
      table.string('email').notNullable();
      table.float('star');
      table.dateTime('checkin_time');
      table.dateTime('checkout_time');

      table.timestamp('created_at').notNullable();
      table.timestamp('updated_at').nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
