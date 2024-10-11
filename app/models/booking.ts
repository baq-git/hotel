import { DateTime } from 'luxon';
import { afterFind, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Guest from '#models/guest';
import Room from '#models/room';

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare bookingId: number;

  @column()
  declare guestId: number;

  @belongsTo(() => Guest, {
    foreignKey: 'guestId',
  })
  declare guest: BelongsTo<typeof Guest>;

  @column()
  declare roomId: number;

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>;

  @column()
  declare totalPrice: number;

  @column.date()
  declare checkinDate: DateTime;

  @column.date()
  declare checkoutDate: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
