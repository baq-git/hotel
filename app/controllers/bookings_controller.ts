import Booking from '#models/booking';
import BookingService from '#services/booking_service';
import DatetimeService from '#services/datetime_service';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import { DateTime, Duration } from 'luxon';

export default class BookingsController {
  private convertToLocaleDate(date: DateTime) {
    return DatetimeService.convertLocaleString(date);
  }

  private convertToTime(date: DateTime) {
    return DatetimeService.getTimeOfISODatetime(date);
  }

  async store({ request, response }: HttpContext) {
    const { userId, roomId, pricePerHour, pricePerNight, checkinDate, checkoutDate } =
      request.body();
    const diffDateTime = DatetimeService.calcDiffDateTime(checkinDate, checkoutDate);
    const cvCheckinDate = DatetimeService.convertDateTime(checkinDate);
    const cvCheckoutDate = DatetimeService.convertDateTime(checkoutDate);

    const totalPrice =
      diffDateTime.get('days') * pricePerNight + diffDateTime.get('hours') * pricePerHour;

    const booking = await Booking.create({
      userId,
      roomId,
      totalPrice,
      checkinDate: cvCheckinDate,
      checkoutDate: cvCheckoutDate,
    });

    return response.redirect().toRoute('bookings.show', {
      id: booking.id,
    });
  }

  async show({ params, view }: HttpContext) {
    const { id } = params;
    const booking = await BookingService.getBooking(id);
    let localeCheckinDate: string;
    let localeCheckoutDate: string;
    let diffDateTime: Duration;

    if (booking) {
      localeCheckinDate = DatetimeService.convertLocaleString(booking.checkinDate);
      localeCheckoutDate = DatetimeService.convertLocaleString(booking.checkoutDate);
      diffDateTime = DatetimeService.calcDiffDateTime(localeCheckinDate, localeCheckoutDate);

      return view.render('pages/bookings/show', {
        diffDateTime,
        booking,
        localeCheckinDate,
        localeCheckoutDate,
      });
    }
  }

  async getBookingsInRoom({ request, view, auth }: HttpContext) {
    const { roomId } = request.params();
    const bookingsByRoom = await BookingService.getBookingsByRoomId(roomId);
    logger.info(auth);

    return view.render('components/bookings/show/bookings_by_room', {
      bookingsByRoom,
      convertDate: this.convertToLocaleDate,
    });
  }

  async getBookingsOfUser({ view, params }: HttpContext) {
    const { userId } = params;
    const bookingsByUser = await BookingService.getBookingsByUserId(userId);

    return view.render('pages/bookings/my_bookings', {
      bookingsByUser,
      convertDate: this.convertToLocaleDate,
      convertTime: this.convertToTime,
    });
  }
}
