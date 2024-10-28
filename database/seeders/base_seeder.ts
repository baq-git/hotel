import Hotel from '#models/hotel';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Roles from '#enums/roles';
import Role from '#models/role';
import { faker } from '@faker-js/faker';
import RoomType from '#models/room_type';
import RoomTypes from '#enums/roomtypes';
import { UserFactory } from '#database/factories/user_factory';
import { DateTime } from 'luxon';

export default class extends BaseSeeder {
  async run() {
    await Hotel.create({
      name: 'Ori',
      address: '1000 W 20th Ave, Baltimore, Maryland',
      phone: '0447917239377',
      email: 'ori@hotelmail.com',
      star: faker.number.float({ min: 4, max: 5 }),
      checkinTime: DateTime.now().set({ hour: 13, minute: 0 }),
      checkoutTime: DateTime.now().set({ hour: 12, minute: 0 }),
    });

    await Role.createMany([
      {
        id: Roles.USER,
        name: 'user',
      },
      {
        id: Roles.ADMIN,
        name: 'admin',
      },
    ]);

    await RoomType.createMany([
      {
        typeName: RoomTypes[RoomTypes.vjp],
        description: faker.lorem.paragraph(),
        pricePerNight: 300,
        pricePerHour: 15,
        capacity: Number(faker.number.int({ min: 1, max: 6 })),
      },
      {
        typeName: RoomTypes[RoomTypes.chjcken],
        description: faker.lorem.paragraph(),
        pricePerNight: 240,
        pricePerHour: 10,
        capacity: 2,
      },
      {
        typeName: RoomTypes[RoomTypes.bee],
        description: faker.lorem.paragraph(),
        pricePerNight: 400,
        pricePerHour: 20,
        capacity: faker.number.int({ min: 3, max: 6 }),
      },
    ]);

    await UserFactory.tap((row) => {
      row.email = 'admin@mail.com';
      row.fullName = 'ADMIN';
      row.roleId = 2;
      row.password = 'admin@123';
    }).create();
  }
}
