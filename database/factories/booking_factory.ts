import factory from '@adonisjs/lucid/factories';
import Booking from '#models/booking';
import User from '#models/user';
import Room from '#models/room';
import RoomType from '#models/room_type';
import { DateTime } from 'luxon';

export const BookingFactory = factory
  .define(Booking, async ({ faker }) => {
    const users = await User.query().where('roleId', 1);
    const rooms = await Room.all();
    const roomTypes = await RoomType.all();

    const userIds = users.map((item) => item.id);
    const roomIds = rooms.map((item) => item.id);

    const nights = faker.number.int({ min: 0, max: 31 });
    const hours = faker.number.int({ min: 1, max: 24 });

    return {
      userId: faker.helpers.arrayElement(userIds),
      roomId: faker.helpers.arrayElement(roomIds),
      totalPrice:
        nights * faker.helpers.arrayElement(roomTypes).pricePerNight +
        hours * faker.helpers.arrayElement(roomTypes).pricePerHour,
      checkinDate: DateTime.now(),
      checkoutDate: DateTime.now().plus({ days: nights }),
    };
  })
  .build();

