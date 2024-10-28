import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import Room from '#models/room';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column()
  declare address: string;

  @column()
  declare phone: string;

  @column()
  declare email: string;

  @column()
  declare star: number | null;

  @hasMany(() => Room)
  declare rooms: HasMany<typeof Room>;

  @column.dateTime()
  declare checkinTime: DateTime;

  @column.dateTime()
  declare checkoutTime: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
