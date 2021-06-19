import { Component } from '@angular/core';
import { BaseWidget } from 'app/models/base-widget.component';
import { Result } from 'app/models/common-api-url.model';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'ly-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent extends BaseWidget {
  constructor(private sessionService: SessionStorageService) {
    super();
  }
  fetchData() {
    this.data = JSON.parse(this.sessionService.retrieve('availableApplications') || '[]');
    this.onDataLoaded();
  }
  getSizeOfWidget(): string {
    return 'large';
  }
  getViewMoreLink(): string {
    return '';
  }
  getNoDataMessage(): string {
    return '';
  }
  getDataObservable() {
    return new Observable<Result>();
  }
}
