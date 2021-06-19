import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ly-application-list-carousel',
  templateUrl: './application-list-carousel.component.html',
  styleUrls: ['./application-list-carousel.component.scss']
})
export class ApplicationListCarouselComponent implements OnInit {
  @Input() appData: any = {};
  @Output() clickedApp = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.carousel();
  }

  carousel(): void {
    $(document).ready(function (): void {
      ($('#application-list-carousel') as any).owlCarousel({
        loop: false,
        dots: true,
        URLhashListener: true,
        responsive: {
          0: {
            items: 1,
          },
          300: {
            items: 4,
          },
          1216: {
            items: 6,
          }
        },
      });
    });
  }
}
