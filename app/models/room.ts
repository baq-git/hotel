import { DateTime } from 'luxon';
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Hotel from '#models/hotel';
import RoomType from '#models/room_type';

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare roomNumber: string;

  @column()
  declare status: string | 'Due Out' | 'Occupied' | 'Over Night';

  @column()
  declare hotelId: number;

  @belongsTo(() => Hotel)
  declare hotel: BelongsTo<typeof Hotel>;

  @column()
  declare roomTypeId: number;

  @belongsTo(() => RoomType)
  declare roomType: BelongsTo<typeof RoomType>;

  @column()
  declare floor: number;

  @beforeSave()
  static async setFloor(room: Room) {
    room.floor = Math.trunc(Number(room.roomNumber) / 100);
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
