import { BaseSchema } from '@adonisjs/lucid/schema';
import Roles from '#enums/roles';

export default class extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .notNullable()
        .defaultTo(Roles.USER);
      table.string('full_name').nullable();
      table.string('email', 254).notNullable().unique();
      table.string('password').notNullable();

      table.timestamp('created_at', { precision: 6 }).notNullable();
      table.timestamp('updated_at', { precision: 6 }).nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
