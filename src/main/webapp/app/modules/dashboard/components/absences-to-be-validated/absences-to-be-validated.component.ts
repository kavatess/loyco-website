import { Component } from '@angular/core';
import { BaseWidget } from './../../../../models/base-widget.component';
import { AbsencesServices } from 'app/core/services/absences.services';
import { loyappsManager } from 'app/models/common-api-url.model';
import { SERVER_API_URL } from 'app/app.constants';

@Component({
  selector: 'ly-absences-to-be-validated',
  templateUrl: './absences-to-be-validated.component.html',
  styleUrls: ['./absences-to-be-validated.component.scss'],
})
export class AbsencesToBeValidatedComponent extends BaseWidget {
  constructor(private absencesServices: AbsencesServices) {
    super();
  }

  getDataObservable() {
    return this.absencesServices.getNumberOfAbsencesToBeValidated();
  }

  getViewMoreLink() {
    return SERVER_API_URL + loyappsManager;
  }

  getNoDataMessage() {
    return 'widget.absenceTask.message.noData';
  }

  getSizeOfWidget() {
    return 'small';
  }
}
