import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result, payslips, payslipDownload } from 'app/models/common-api-url.model';
import { CommonHttpService } from './commonHttp.service';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class PayslipsService {
  constructor(private commonHttpService: CommonHttpService, private http: HttpClient) {}
  getPayslipsData(): Observable<Result> {
    return this.commonHttpService.requestServerByURL(payslips.url, payslips.getPayslips);
  }

  getFileByName(filename: string): Observable<Blob> {
    const result: Observable<Blob> = this.http.get<Blob>(`${SERVER_API_URL}${payslipDownload}${filename}`, {
      observe: 'body',
      responseType: 'blob' as 'json',
    });
    return result;
  }
}
