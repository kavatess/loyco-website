import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SERVER_API_URL } from 'app/app.constants';
import { NextAbsencesService } from 'app/core/services/next-absences.service';
import { BaseWidget } from 'app/models/base-widget.component';
import { loyappsEmployeeAbsence, Result } from 'app/models/common-api-url.model';
import { NextAbsenceModel } from 'app/models/next-absence.model';
import { Observable } from 'rxjs';
function carousel(): void {
  $(document).ready(function (): void {
    require('owl.carousel');
    ($('#absence-data-carousel') as any).owlCarousel({
      loop: false,
      margin: 20,
      URLhashListener: true,
      dotsEach: true,
      dotsSpeed: 500,
      responsive: {
        0: {
          items: 1,
        },
      },
    });
  });
}
@Component({
  selector: 'ly-next-absence-table',
  templateUrl: './next-absence-table.component.html',
  styleUrls: ['./next-absence-table.component.scss'],
})
export class NextAbsenceTableComponent extends BaseWidget {
  titleList = [
    this.translate.instant('widget.myNextAbsences.columns.reason'),
    this.translate.instant('widget.myNextAbsences.columns.startDate'),
    this.translate.instant('widget.myNextAbsences.columns.endDate'),
    this.translate.instant('widget.myNextAbsences.columns.status'),
    this.translate.instant('widget.myNextAbsences.columns.durationInDays'),
  ];

  constructor(private dataService: NextAbsencesService, private translate: TranslateService) {
    super();
  }

  onDataLoaded(): void {
    super.onDataLoaded();
    // Get data from server, sort asc date and pick first 5 elements
    this.data = this.data
      .sort((a: NextAbsenceModel, b: NextAbsenceModel) => new Date(a.StartDate).getTime() - new Date(b.StartDate).getTime())
      .splice(0, 5);
    // Add carousel effect when the resolution of the app is smaller than 768px and Loading Circle while starting page
    carousel();
  }
  getDataObservable(): Observable<Result> {
    return this.dataService.getNextAbsenceData();
  }
  getViewMoreLink(): string {
    return SERVER_API_URL + loyappsEmployeeAbsence;
  }
  getNoDataMessage(): string {
    return 'widget.myNextAbsences.message.noData';
  }
}
