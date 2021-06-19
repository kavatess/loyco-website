import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'app/models/common-api-url.model';
import { balanceDashboard } from 'app/models/common-api-url.model';
import { CommonHttpService } from './commonHttp.service';
@Injectable({
  providedIn: 'root',
})
export class BalanceDashboardService {
  constructor(private commonHttp: CommonHttpService) {}
  getBalanceData(): Observable<Result> {
    return this.commonHttp.requestServerByURL(balanceDashboard.balanceDashboardUrl, balanceDashboard.balancePOSTJSON);
  }
  getBalanceSetUp(): Observable<Result> {
    return this.commonHttp.requestServerByURL(balanceDashboard.balanceDashboardSetUpUrl, balanceDashboard.balanceSetUpPOSTJSON);
  }
}
