import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttpService } from './commonHttp.service';
import { Result, user } from 'app/models/common-api-url.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: CommonHttpService) {}
  getUserData(): Observable<Result> {
    return this.httpService.requestServerByURL(user.userProfileTblUrl, user.userPOSTJSON);
  }
  getLang(): Observable<Result> {
    return this.httpService.requestServerByURL(user.userProfileTblUrl, user.userLang);
  }
  updateLang(lang: string): Observable<Result> {
    return this.httpService.requestServerNotCache(user.userProfileTblUrl, {
      name: 'updateLanguage',
      parameters: [{ language: lang }],
    });
  }
  getEmployeeID(): Observable<Result> {
    return this.httpService.requestServerByURL(user.userProfileTblUrl, user.employeeID);
  }
  getAvailableApplication(): Observable<Result> {
    return this.httpService.requestServerByURL(user.userProfileTblUrl, user.availableApplications);
  }
  getActiveModule(): Observable<Result> {
    return this.httpService.requestServerByURL(user.moduleSetupUrl, user.moduleSetup);
  }
}
