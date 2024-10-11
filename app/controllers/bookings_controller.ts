import loggerConfig from '#config/logger';
import Booking from '#models/booking';
import BookingService from '#services/booking_service';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import { Duration } from 'luxon';

export default class BookingsController {
  async store({ request, response }: HttpContext) {
    const { guestId, roomId, pricePerHour, pricePerNight, checkinDate, checkoutDate } =
      request.body();
    const diffDateTime = BookingService.calcDiffDateTime(checkinDate, checkoutDate);
    const cvCheckinDate = BookingService.convertDateTime(checkinDate);
    const cvCheckoutDate = BookingService.convertDateTime(checkoutDate);

    const totalPrice =
      diffDateTime.get('days') * pricePerNight + diffDateTime.get('hours') * pricePerHour;

    const booking = await Booking.create({
      guestId,
      roomId,
      totalPrice,
      checkinDate: cvCheckinDate,
      checkoutDate: cvCheckoutDate,
    });

    return response.redirect().toRoute('bookings.show', { id: booking.bookingId });
  }

  async show({ params, view }: HttpContext) {
    const { id } = params;
    const booking = await Booking.query()
      .where('booking_id', id)
      .preload('room', (roomsQuery) => {
        roomsQuery.preload('roomType');
      })
      .preload('guest')
      .first();

    let localeCheckinDate: string;
    let localeCheckoutDate: string;
    let diffDateTime: Duration;

    if (booking) {
      localeCheckinDate = BookingService.convertLocaleString(booking.checkinDate);
      localeCheckoutDate = BookingService.convertLocaleString(booking.checkoutDate);
      diffDateTime = BookingService.calcDiffDateTime(localeCheckinDate, localeCheckoutDate);

      return view.render('pages/bookings/show', {
        diffDateTime,
        booking,
        localeCheckinDate,
        localeCheckoutDate,
      });
    }
  }

  async getBookingsInRoom({ request, view }: HttpContext) {
    const { roomId } = request.params();
    const bookingsByRoom = await BookingService.getBookingsByRoomId(roomId);
    logger.info(bookingsByRoom);
    return view.render('components/bookings/show/bookings_by_room', { bookingsByRoom });
  }
}
