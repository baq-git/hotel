import { DateTime, Duration } from 'luxon';

export default class DatetimeService {
  // convert to DateTime
  static convertDateTime(date: string) {
    const dateTime = DateTime.fromFormat(date, 'MMM d, yyyy');
    return dateTime;
  }

  // convert dateTime to localeString
  static convertLocaleString(date: DateTime) {
    return date?.toLocaleString(DateTime.DATE_MED);
  }

  static calcDiffDateTime(checkinDate: string | DateTime, checkoutDate: string | DateTime) {
    let diffInDays;

    if (typeof checkinDate === 'string' && typeof checkoutDate === 'string') {
      diffInDays = this.convertDateTime(checkoutDate).diff(this.convertDateTime(checkinDate), [
        'days',
        'hours',
      ]);
    }

    if (checkinDate instanceof DateTime && checkoutDate instanceof DateTime) {
      diffInDays = checkoutDate.diff(checkinDate, ['days', 'hours']);
    }

    return diffInDays;
  }

  static getTimeOfISODatetime(date: DateTime) {
    return date.get('hour').toString();
  }
}
