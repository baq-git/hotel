import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Room from '#models/room';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class RoomType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare typeName: string;

  @column()
  declare description: string;

  @column()
  declare pricePerNight: number;

  @column()
  declare pricePerHour: number;

  @column()
  declare capacity: number;

  @hasMany(() => Room)
  declare rooms: HasMany<typeof Room>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
