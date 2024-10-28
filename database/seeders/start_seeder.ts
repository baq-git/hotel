import { RoomFactory } from '#database/factories/room_factory';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { UserFactory } from '#database/factories/user_factory';
import { BookingFactory } from '#database/factories/booking_factory';

export default class extends BaseSeeder {
  static environment = ['development'];
  async run() {
    await this.#createRooms();
    await this.#createUsers();
    await this.#createBooking();
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

  async #createBooking() {
    await BookingFactory.createMany(1000);
  }
}
