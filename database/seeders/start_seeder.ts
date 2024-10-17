import { RoomFactory } from '#database/factories/room_factory';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import logger from '@adonisjs/core/services/logger';
import { UserFactory } from '#database/factories/user_factory';

export default class extends BaseSeeder {
  static environment = ['development'];
  async run() {
    await this.#createRooms();
    await this.#createUsers();
  }

  async #createRooms() {
    let i = 0;
    await RoomFactory.tap((row) => {
      row.roomNumber = `${Math.trunc(i / 5)}0${(i % 5) + 1}`;
      i++;
    }).createMany(50);
  }

  async #createUsers() {
    await UserFactory.createMany(49);
  }
}
