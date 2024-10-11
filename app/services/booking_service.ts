import Booking from '#models/booking';
import { DateTime } from 'luxon';

export default class BookingService {
  static convertDateTime(date: string) {
    const dateTime = DateTime.fromFormat(date, 'MMM d, yyyy');
    return dateTime;
  }

  static convertLocaleString(date: DateTime) {
    return date?.toLocaleString(DateTime.DATE_MED);
  }

  static calcDiffDateTime(checkinDate: string, checkoutDate: string) {
    const diffInDays = this.convertDateTime(checkoutDate).diff(this.convertDateTime(checkinDate), [
      'days',
      'hours',
    ]);

    return diffInDays;
  }

  static getBookingsByRoomId(roomId: number) {
    return Booking.query()
      .where('room_id', roomId)
      .preload('room', (roomsQuery) => roomsQuery.preload('roomType'))
      .orderBy('booking_id', 'asc');
  }

  static getBookingsByGuestId(guestId: number) {
    return Booking.query()
      .where('guest_id', guestId)
      .preload('room')
      .preload('guest')
      .orderBy('booking_id', 'asc');
  }
}
