import { Component, OnInit } from '@angular/core';
import { loyappsManager, Result } from 'app/models/common-api-url.model';
import { Observable } from 'rxjs';
import { TimesheetValidationService } from 'app/core/services/timesheet-validation.service';
import { BaseWidget } from 'app/models/base-widget.component';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
  selector: 'ly-timesheet-validation',
  templateUrl: './timesheet-validation.component.html',
  styleUrls: ['./timesheet-validation.component.scss'],
})
export class TimesheetValidationComponent extends BaseWidget implements OnInit {
  constructor(private timesheetValidateService: TimesheetValidationService) {
    super();
  }
  get timesheetNumber(): number {
    return this.hasData ? Number(this.data) : -1;
  }
  checkData(): void {
    this.hasData = !isNaN(Number(this.data)) && Number(this.data) >= 0;
  }
  getDataObservable(): Observable<Result> {
    return this.timesheetValidateService.getValidateTimeSheetData();
  }
  getSizeOfWidget(): string {
    return 'small';
  }
  getViewMoreLink(): string {
    return SERVER_API_URL + loyappsManager;
  }
  getNoDataMessage(): string {
    return 'widget.timesheetTask.message.noData';
  }
}
