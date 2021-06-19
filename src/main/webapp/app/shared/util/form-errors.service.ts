import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  constructor(private translate: TranslateService) {}

  errorMap() {
    return {
      required: () => this.translate.instant('app.form.error.required'),
      startDateGreaterThanEndDate: () => this.translate.instant('app.form.error.startBeforeEnd'),
      matDatepickerParse: () => this.translate.instant('app.form.error.invalidFormatDate'),
    };
  }
}
