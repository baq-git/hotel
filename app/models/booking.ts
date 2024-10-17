import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Room from '#models/room';
import User from '#models/user';

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare roomId: number;

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>;

  @column()
  declare totalPrice: number;

  @column.dateTime()
  declare checkinDate: DateTime;

  @column.dateTime()
  declare checkoutDate: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
