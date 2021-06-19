import { Component } from '@angular/core';
import { AbsencesServices } from 'app/core/services/absences.services';
import { TeamAbsencesInfoModel } from 'app/models/team-absences-info-model';
import { BaseWidget } from 'app/models/base-widget.component';
import { Observable } from 'rxjs';
import { loyappsEmployeeAbsence } from 'app/models/common-api-url.model';
import { SERVER_API_URL } from 'app/app.constants';
@Component({
  selector: 'ly-team-absences',
  templateUrl: './team-absences.component.html',
  styleUrls: ['./team-absences.component.scss'],
})
export class TeamAbsencesComponent extends BaseWidget {
  data: TeamAbsencesInfoModel[] = [];
  constructor(private absencesServices: AbsencesServices) {
    super();
  }
  onDataLoaded(): void {
    super.onDataLoaded();
    if (this.hasData) {
      this.carousel();
    }
  }
  getDataObservable(): Observable<any> {
    return this.absencesServices.getTeamAbsencesData();
  }
  getViewMoreLink(): string {
    return SERVER_API_URL + loyappsEmployeeAbsence;
  }
  getNoDataMessage(): string {
    return 'widget.teamAbsence.message.noData';
  }
  carousel(): void {
    $(document).ready(function (): void {
      ($('#carousel-team-absences') as any).owlCarousel({
        loop: false,
        URLhashListener: true,
        nav: true,
        dots: false,
        smartSpeed: 600,
        rewind: false,
        navText: [
          `<button class='ly-prev ly-icon-button'><span class='fa fa-chevron-left'></span></button>`,
          `<button class='ly-next ly-icon-button'><span class='fa fa-chevron-right'></span></button>`,
        ],
        responsive: {
          0: {
            items: 1,
          },
          696: {
            items: 2,
          },
          956: {
            items: 3,
          },
          1216: {
            items: 4,
          },
        },
      });
      $('.ly-team-absences .ly-background-empty').fadeOut();
    });
  }
}
