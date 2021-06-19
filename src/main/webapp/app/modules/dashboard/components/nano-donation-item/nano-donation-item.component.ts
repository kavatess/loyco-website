import { Component, Input } from '@angular/core';
import { NanoDonation } from 'app/models/nano-donation-model';
@Component({
  selector: 'ly-nano-donation-item',
  templateUrl: './nano-donation-item.component.html',
  styleUrls: ['./nano-donation-item.component.scss'],
})
export class NanoDonationItemComponent {
  @Input() data: NanoDonation = new NanoDonation();
  constructor() {}
}
