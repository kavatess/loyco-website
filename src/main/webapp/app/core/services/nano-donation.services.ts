import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { nanoDonation, Result } from '../../models/common-api-url.model';
import { CommonHttpService } from './commonHttp.service';
@Injectable({
  providedIn: 'root',
})
export class NanoDonationService {
  constructor(private commonHttpService: CommonHttpService) {}
  getNanoDonationFoundations(): Observable<Result> {
    return this.commonHttpService.requestServerByURL(nanoDonation.nanoDonationSetupFoundURL, nanoDonation.getNanoDonationFoundations);
  }
  getNanoDonationSetupEE(): Observable<Result> {
    return this.commonHttpService.requestServerNotCache(nanoDonation.nanoDonationEeSetupUrl, nanoDonation.getNanoDonationSetupEE);
  }
  updateNanoDonationSetupEE(data: any): Observable<Result> {
    return this.commonHttpService.requestServerNotCache(nanoDonation.nanoDonationEeSetupUrl, data);
  }
}
