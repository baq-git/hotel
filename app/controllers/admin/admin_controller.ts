import BookingService from '#services/booking_service';
import DatetimeService from '#services/datetime_service';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

export default class AdminController {
  private convertLocaleDate(date: DateTime) {
    return DatetimeService.convertLocaleString(date);
  }

  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1);
    const limit = 20;
    const bookings = await BookingService.getAllBookings().paginate(page, limit);
    bookings.baseUrl('/admin');

    const paginationProps = {
      paginationUrls: bookings.getUrlsForRange(1, bookings.lastPage),
      nextPageUrl: bookings.getNextPageUrl(),
      previousPageUrl: bookings.getPreviousPageUrl(),
    };

    return view.render('pages/admin/index', {
      bookings,
      paginationProps,
      convertDate: this.convertLocaleDate,
    });
  }
}
