import { Injectable, isDevMode } from '@angular/core';
import { user } from 'app/models/common-api-url.model';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private header: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private session: SessionStorageService) {}
  login(username: string, pass: string): void {
    this.header = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + pass),
    });
    this.authenticate();
  }
  authenticate(): any {
    return this.http
      .post<any>(SERVER_API_URL + '/' + user.userProfileTblUrl, JSON.stringify(user.userLang), {
        headers: this.header,
        observe: 'response',
        responseType: 'json',
      })
      .toPromise()
      .then(res => {
        this.session.store('restSessionId', res.headers.get('REST_SESSIONID') || 'null');
        location.reload();
      })
      .catch(() => {
        alert('login failed');
      });
  }
  isAuthenticated(): boolean {
    return this.route.snapshot.paramMap.get('jsessionid') !== null || this.session.retrieve('restSessionId') || this.isProduction();
  }
  isProduction(): boolean {
    return !isDevMode();
  }
}
