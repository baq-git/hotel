import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Booking from '#models/booking';

export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  declare guestId: number;

  @column()
  declare firstName: string;

  @column()
  declare lastName: string;

  @column.date()
  declare dateOfBirth: DateTime;

  @column()
  declare address: string;

  @column()
  declare phone: string;

  @column()
  declare email: string;

  @hasMany(() => Booking)
  declare bookings: HasMany<typeof Booking>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
