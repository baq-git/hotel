import BookingService from '#services/booking_service';
import DatetimeService from '#services/datetime_service';
import PaginationService from '#services/pagination_service';
import { searchBookingValidator } from '#validators/booking';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';
import { DateTime } from 'luxon';

export default class AdminController {
  private convertLocaleDate(date: DateTime) {
    return DatetimeService.convertLocaleString(date);
  }

  private calcDiffDate(checkinDate: string, checkoutDate: string) {
    return DatetimeService.calcDiffDateTime(checkinDate, checkoutDate)?.days;
  }

  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1);
    const filters = await searchBookingValidator.validate(request.qs());
    const bookings = await BookingService.getBookingsWithFiltered(filters).paginate(page, 20);

    const paginationProps = PaginationService.paginate(bookings.baseUrl('/admin'));

    return view.render('pages/admin/index', {
      bookings,
      paginationProps,
      convertDate: this.convertLocaleDate,
      diffDate: this.calcDiffDate,
    });
  }
}
