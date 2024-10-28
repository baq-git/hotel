import Booking from '#models/booking';

export default class BookingService {
  static getAllBookings() {
    return Booking.query()
      .preload('user')
      .preload('room', (queries) => queries.preload('roomType'))
      .orderBy('createdAt', 'desc');
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

  static getBookingsByRoomId(roomId: number) {
    return Booking.query()
      .where('room_id', roomId)
      .preload('room', (roomsQuery) => roomsQuery.preload('roomType'))
      .orderBy('id', 'asc');
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
