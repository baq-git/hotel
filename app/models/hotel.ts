import { BaseModel, column } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';

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

  @column.date()
  declare checkInTime: DateTime;

  @column.date()
  declare checkOutTime: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
