import Room from '#models/room';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { faker } from '@faker-js/faker';

export default class extends BaseSeeder {
  async run() {
    const rooms = Array.from({ length: 50 }).map((_, i) => {
      return {
        roomNumber: `${Math.trunc(i / 5)}0${(i % 5) + 1}`,
        status: faker.helpers.arrayElement([
          faker.lorem.word(),
          'Due Out',
          'Occupied',
          'Over Night',
        ]),
        hotelId: 1,
        roomTypeId: faker.helpers.arrayElement([1, 2, 3]),
      };
    });

    await Room.createMany(rooms);
  }
}
