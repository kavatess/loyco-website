import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private session: SessionStorageService, private translate: TranslateService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestURL = new URL(request.url);
    const restSessionId = this.session.retrieve('restSessionId');
    if (restSessionId && restSessionId !== 'null') {
      requestURL.href = requestURL.origin + requestURL.pathname + ';jsessionid=' + restSessionId + requestURL.search;
    }
    const httpsReq = request.clone({
      url: requestURL.href,
      headers: new HttpHeaders({
        'Content-Type': request.headers.get('Content-Type') || 'application/vnd.oracle.adf.action+json',
        'Accept-Language': this.translate.currentLang,
      }),
    });
    return next.handle(httpsReq);
  }
}
