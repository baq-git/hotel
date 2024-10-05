import { faker } from '@faker-js/faker';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import RoomType from '#models/room_type';

export default class extends BaseSeeder {
  static environment = ['development', 'testing'];

  async run() {
    const vjp = {
      typeName: 'vjp',
      description: faker.lorem.paragraph(),
      pricePerNight: 300,
      pricePerHour: 15,
      capacity: Number(faker.number.int({ min: 1, max: 6 })),
    };

    const chjcken = {
      typeName: 'chjcken',
      description: faker.lorem.paragraph(),
      pricePerNight: 240,
      pricePerHour: 10,
      capacity: 2,
    };

    const bee = {
      typeName: 'bee',
      description: faker.lorem.paragraph(),
      pricePerNight: 400,
      pricePerHour: 20,
      capacity: faker.number.int({ min: 3, max: 6 }),
    };

    await RoomType.createMany([chjcken, vjp, bee]);
  }
}
