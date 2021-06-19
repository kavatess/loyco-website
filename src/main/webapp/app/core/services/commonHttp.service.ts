import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from 'app/models/common-api-url.model';
import { SERVER_API_URL } from 'app/app.constants';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommonHttpService {
  private cacheData$ = new Map();
  constructor(private http: HttpClient) {}

  requestServerByURL(url: any, requestJSON: any, headers?: HttpHeaders): Observable<Result> {
    if (this.cacheData$.has(url + requestJSON.name)) {
      return this.cacheData$.get(url + requestJSON.name);
    }
    const result: Observable<Result> = this.http
      .post<Result>(SERVER_API_URL + '/' + url, JSON.stringify(requestJSON), { headers })
      .pipe(shareReplay(1));
    this.cacheData$.set(url + requestJSON.name, result);
    return result;
  }
  requestServerNotCache(url: any, requestJSON: any, headers?: HttpHeaders): Observable<Result> {
    return this.http.post<Result>(SERVER_API_URL + '/' + url, JSON.stringify(requestJSON), { headers });
  }
}
