import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
@Pipe({
  name: 'dateStringFromNow',
})
export class DateStringFromNow implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(date: any, dayTimesIdEnd: any, contractEndDate: any): any {
    let result = this.translate.instant('widget.teamAbsence.expectedReturn.empty');
    if (date) {
      const targetDate = moment(new Date(date)); // Convert date string to Date object will remove the warning related to RFC2822 or ISO format
      if (contractEndDate) {
        const endDate = moment(new Date(contractEndDate)); // Convert contract end date string to Date object
        // do not display any date when this date is after or equal the contract end date of the employee
        if (!targetDate.isBefore(endDate, 'day')) {
          return null;
        }
      }

      const today = moment().startOf('day'); // Current date with hours, minutes and seconds will all be set to zero for the local time zone.
      const tomorrow = moment().add(1, 'days');
      const todayInNextWeek = moment().add(1, 'weeks');

      if (targetDate.isSame(today, 'day')) {
        // ie. Today (Morning)
        result = this.translate.instant('widget.teamAbsence.expectedReturn.today', {
          value: this.translate.instant('widget.teamAbsence.dayTimesId.' + dayTimesIdEnd),
        });
      } else if (targetDate.isSame(tomorrow, 'day')) {
        // ie. Tomorrow (Morning)
        result = this.translate.instant('widget.teamAbsence.expectedReturn.tomorrow', {
          value: this.translate.instant('widget.teamAbsence.dayTimesId.' + dayTimesIdEnd),
        });
      } else if (targetDate.isSame(today, 'week')) {
        // ie. In 3 days
        result = this.translate.instant('widget.teamAbsence.expectedReturn.inWeek', { value: targetDate.diff(today, 'days') });
      } else if (targetDate.isSame(todayInNextWeek, 'week')) {
        // ie. Sunday next week
        result = this.translate.instant('widget.teamAbsence.expectedReturn.nextWeek', { value: targetDate.format('dddd') });
      } else if (targetDate.isAfter(todayInNextWeek.endOf('week'))) {
        // If current date is in the same current year => ie. Monday 19 August
        // Else => ie. Monday 19 August 2020
        result = targetDate.isSame(today, 'year') ? targetDate.format('dddd D MMMM') : targetDate.format('dddd D MMMM YYYY');
      }
    }
    return this.translate.instant('widget.teamAbsence.expectedReturn.label') + result;
  }
}
