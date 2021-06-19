import { Component } from '@angular/core';
import { NanoDonationListService } from 'app/core/services/nano-donation-list.service';
import { BaseWidget } from 'app/models/base-widget.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ly-nano-donation',
  templateUrl: './nano-donation.component.html',
  styleUrls: ['./nano-donation.component.scss'],
})
export class NanoDonationComponent extends BaseWidget {
  constructor(private nanoDonationService: NanoDonationListService) {
    super();
  }

  getDataObservable(): Observable<any> {
    return this.nanoDonationService.getNanoDonationList();
  }
  getNoDataMessage(): string {
    return 'widget.nanoDonation.noNanoDonationData';
  }
  getSizeOfWidget(): string {
    return 'small';
  }
  getViewMoreLink(): string {
    return '';
  }
}
