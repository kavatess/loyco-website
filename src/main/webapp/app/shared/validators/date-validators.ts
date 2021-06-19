import { AbstractControl, ValidatorFn } from '@angular/forms';
import moment from 'moment';
import { removeAttributes } from 'app/shared/util/app-util';

export class DateValidators {
  static dateLessThan(
    startDateField: string,
    dayTimesIdStartField: string,
    endDateField: string,
    dayTimesIdEndField: string,
    validatorField: { [key: string]: boolean }
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let result = null;
      const startDate = moment(control.get(startDateField)?.value);
      const endDate = moment(control.get(endDateField)?.value);
      if (
        startDate.isAfter(endDate) ||
        (startDate.isSame(endDate) && control.get(dayTimesIdStartField)?.value >= control.get(dayTimesIdEndField)?.value)
      ) {
        result = validatorField;
      } else {
        result = removeAttributes(control.get(endDateField)?.errors, Object.keys(validatorField));
      }
      control.get(endDateField)?.touched && control.get(endDateField)?.setErrors(result);
      return result;
    };
  }
}
