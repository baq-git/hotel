import Booking from '#models/booking';
import User from '#models/user';
import { searchBookingValidator } from '#validators/booking';
import logger from '@adonisjs/core/services/logger';
import { Infer } from '@vinejs/vine/types';

export default class BookingService {
  // static sortOptions() { }

  static getBookingsWithFiltered(filters: Infer<typeof searchBookingValidator>) {
    return Booking.query()
      .if(filters.search, (query) => {
        query
          .whereILike('id', `%${filters.search}%`)
          .orWhereHas('user', (userQuery) => {
            userQuery.whereILike('email', `%${filters.search}%`);
          })
          .orWhereHas('room', (roomQuery) => {
            roomQuery.whereILike('roomNumber', `%${filters.search}%`);
          });
      })
      .preload('user')
      .preload('room')
      .orderBy('id', 'asc');
  }

  static getBookingsByRoomId(roomId: number) {
    return Booking.query()
      .where('room_id', roomId)
      .preload('room', (roomsQuery) => roomsQuery.preload('roomType'))
      .orderBy('id', 'asc');
  }

  static getBooking(id: string) {
    return Booking.query()
      .where('id', id)
      .preload('room', (roomsQuery) => {
        roomsQuery.preload('roomType');
      })
      .preload('user')
      .first();
  }

  static getBookingsByUserId(userId: number) {
    return Booking.query()
      .where('userId', userId)
      .preload('room', (queries) => {
        queries.preload('roomType');
      })
      .orderBy('id', 'asc');
  }
}
