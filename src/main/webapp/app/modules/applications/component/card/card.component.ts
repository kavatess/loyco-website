import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getApplicationURL } from 'app/shared/util/app-util';

@Component({
  selector: 'ly-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() data: any;
  url = '';

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.url = getApplicationURL(this.data, this.translate.currentLang);
  }
}
