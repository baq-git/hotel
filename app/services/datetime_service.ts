import { DateTime } from 'luxon';

export default class DatetimeService {
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

  static getTimeOfISODatetime(date: DateTime) {
    return date.get('hour').toString();
  }
}
