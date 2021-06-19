import { Injectable } from '@angular/core';
import { Result, timesheetValidation } from 'app/models/common-api-url.model';
import { Observable } from 'rxjs';
import { CommonHttpService } from './commonHttp.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetValidationService {
  constructor(private httpService: CommonHttpService) {}
  getValidateTimeSheetData(): Observable<Result> {
    return this.httpService.requestServerByURL(timesheetValidation.url, timesheetValidation.getNumberOfTasksForCurrentUser);
  }
}
