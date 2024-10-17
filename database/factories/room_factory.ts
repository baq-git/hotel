import factory from '@adonisjs/lucid/factories';
import Room from '#models/room';
import RoomTypes from '#enums/roomtypes';
import Hotel from '#models/hotel';

export const RoomFactory = factory
  .define(Room, async ({ faker }) => {
    const hotel = await Hotel.first();
    return {
      status: faker.helpers.arrayElement([faker.lorem.word(), 'Due Out', 'Occupied', 'Over Night']),
      hotelId: hotel?.id,
      roomTypeId: faker.helpers.arrayElement([RoomTypes.bee, RoomTypes.vjp, RoomTypes.chjcken]),
    };
  })
  .build();
