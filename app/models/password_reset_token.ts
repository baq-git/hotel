import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import User from '#models/user';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import string from '@adonisjs/core/helpers/string';
import logger from '@adonisjs/core/services/logger';

export default class PasswordResetToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number | null;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare type: string;

  @column()
  declare token: string;

  @column.dateTime()
  declare expiresAt: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64);

    if (!user) return token;

    await PasswordResetToken.expirePasswordResetTokens(user);
    const record = await user.related('tokens').create({
      type: 'PASSWORD_RESET',
      expiresAt: DateTime.now().plus({ hour: 1 }),
      token,
    });
    return record.token;
  }

  static async expirePasswordResetTokens(user: User) {
    await user
      .related('passwordResetTokens')
      .query()
      .update({
        expiresAt: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
      });
  }
  static async getPasswordResetUser(token: string) {
    const record = await PasswordResetToken.query()
      .preload('user')
      .where('token', token)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first();

    return record?.user;
  }

  static async verify(token: string) {
    const record = await PasswordResetToken.query()
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .first();

    return record;
  }
}
