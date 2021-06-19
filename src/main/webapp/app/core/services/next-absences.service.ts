import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result, nextAbsences } from 'app/models/common-api-url.model';
import { CommonHttpService } from './commonHttp.service';
@Injectable({
  providedIn: 'root',
})
export class NextAbsencesService {
  constructor(private httpService: CommonHttpService) {}
  getNextAbsenceData(): Observable<Result> {
    return this.httpService.requestServerByURL(nextAbsences.nextAbsencesServiceUrl, nextAbsences.getNextAbsences);
  }
}
