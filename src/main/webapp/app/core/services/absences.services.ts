import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonHttpService } from './commonHttp.service';
import { Observable } from 'rxjs';
import { AbsenceModel } from 'app/models/absence.model';
import { Result, absence, absenceReason, teamAbsences, absenceToBeValidated } from 'app/models/common-api-url.model';
@Injectable({
  providedIn: 'root',
})
export class AbsencesServices {
  readonly headers = new HttpHeaders().set('Content-Type', 'application/vnd.oracle.adf.resourceitem+json');

  constructor(private commonHttpService: CommonHttpService) {}
  createAbsence(data: AbsenceModel): Observable<any> {
    return this.commonHttpService.requestServerNotCache(absence.url, data, this.headers);
  }
  getAbsenceReason(): Observable<Result> {
    return this.commonHttpService.requestServerByURL(absenceReason.url, absenceReason.getAbsenceReasons);
  }
  getTeamAbsencesData(): Observable<Result> {
    return this.commonHttpService.requestServerByURL(teamAbsences.url, teamAbsences.getTeamAbsences);
  }
  getNumberOfAbsencesToBeValidated(): Observable<Result> {
    return this.commonHttpService.requestServerByURL(absenceToBeValidated.url, absenceToBeValidated.getNumberOfAbsencesToBeValidated);
  }
}
