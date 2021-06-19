import { Injectable } from '@angular/core';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CONTEXT_PATH } from 'app/app.constants';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private eventManager: JhiEventManager, private httpServcie: HttpClient, private translate: TranslateService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = error.error || this.translate.instant('error.errorCodeMessage', { value: error.statusText });
        }
        if (error.status === 401 || (error.error?.text && error.error?.text.indexOf('id_form') > -1)) {
          window.location.replace(window.location.origin + CONTEXT_PATH + 'all');
        }
        this.eventManager.broadcast(new JhiEventWithContent('Error', error));
        return throwError(errorMessage);
      })
    );
  }
}
