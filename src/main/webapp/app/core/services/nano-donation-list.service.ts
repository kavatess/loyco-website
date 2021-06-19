import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpService } from './commonHttp.service';
import { Result, nanoDonation } from 'app/models/common-api-url.model';
@Injectable({
  providedIn: 'root',
})
export class NanoDonationListService {
  constructor(private httpService: CommonHttpService) {}
  getNanoDonationList(): Observable<Result> {
    return this.httpService.requestServerByURL(nanoDonation.nanoDonationListUrl, nanoDonation.getNanoDonationList);
  }
  getNanoDonationSetupInfo(): Observable<Result> {
    return this.httpService.requestServerByURL(nanoDonation.nanoDonationSetupUrl, nanoDonation.getNanoDonationSetupInfo);
  }
}
