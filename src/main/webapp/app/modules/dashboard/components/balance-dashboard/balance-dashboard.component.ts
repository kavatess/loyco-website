import { Component, HostListener, OnInit } from '@angular/core';
import { BalanceDashboardService } from 'app/core/services/balance-dashboard.service';
import { BalanceDashboardModel, CirclePercentModel, CircleItem, SCREEN_SIZE } from 'app/models/balance-dashboard.model';
import { loyappsEmployeeAbsence } from 'app/models/common-api-url.model';
import { MIN_LARGE_WIDTH, MIN_MEDIUM_WIDTH, SERVER_API_URL } from 'app/app.constants';
import { BaseWidget } from 'app/models/base-widget.component';
@Component({
  selector: 'ly-balance-dashboard',
  templateUrl: './balance-dashboard.component.html',
  styleUrls: ['./balance-dashboard.component.scss'],
})
export class BalanceDashboardComponent extends BaseWidget implements OnInit {
  hide = true;
  listTitle: string[] = [];
  listItem: CircleItem[] = [];
  screenSize = -1;
  data: BalanceDashboardModel[] = [];
  listCirclePercent: CirclePercentModel[] = [];

  constructor(public balanceDashboardService: BalanceDashboardService) {
    super();
  }
  ngOnInit(): void {
    require('owl.carousel');
    super.ngOnInit();
  }
  getNoDataMessage() {
    return 'widget.balance.message.noData';
  }
  setCurrentTitle(): void {
    const listTitle = this.listTitle;
    const screenSize = this.screenSize;
    $(document).ready(function () {
      ($('#carousel-dashboard-balance') as any).on('changed.owl.carousel', function (e: any) {
        screenSize !== 2 ? $('.title-component').html(listTitle[e.item.index]) : $('.title-component').html(listTitle[0]);
      });
    });
  }
  carousel(): void {
    $(document).ready(function () {
      ($('#carousel-dashboard-balance') as any).owlCarousel({
        loop: false,
        margin: 20,
        URLhashListener: true,
        dotsEach: false,
        dotsSpeed: 500,
        responsive: {
          0: {
            items: 1,
          },
        },
      });
    });
  }
  getDataObservable() {
    return this.balanceDashboardService.getBalanceData();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth >= MIN_LARGE_WIDTH && this.screenSize !== SCREEN_SIZE.large) {
      this.insertListLarge();
      this.changeCarousel();
    } else if (window.innerWidth >= MIN_MEDIUM_WIDTH && window.innerWidth < MIN_LARGE_WIDTH && this.screenSize !== SCREEN_SIZE.medium) {
      this.insertListMedium();
      this.changeCarousel();
    } else if (window.innerWidth < MIN_MEDIUM_WIDTH && this.screenSize !== SCREEN_SIZE.small) {
      this.insertListSmall();
      this.changeCarousel();
    }
  }
  getViewMoreLink() {
    return SERVER_API_URL + loyappsEmployeeAbsence;
  }
  onDataLoaded() {
    super.onDataLoaded();
    if (this.hasData) {
      this.calcCirclePercent();
      this.onResize();
    }
    setTimeout(() => {
      this.hide = false;
    }, 1);
  }
  changeCarousel(): void {
    $('#carousel-dashboard-balance').trigger('destroy.owl.carousel');
    this.carousel();
    this.setCurrentTitle();
  }
  calcCirclePercent(): void {
    for (const item of this.data) {
      this.listTitle.push(item.BalanceTitle);
      const cirlceItem = new CirclePercentModel();
      cirlceItem.parseData(item);
      this.listCirclePercent.push(cirlceItem);
      this.listItem = this.listItem.concat(cirlceItem.getListItem());
    }
  }

  insertListSmall() {
    this.screenSize = SCREEN_SIZE.small;
    this.listCirclePercent[0].listItem = this.listItem.slice(3, 4).concat(this.listItem.slice(0, 3));
  }

  insertListMedium() {
    this.screenSize = SCREEN_SIZE.medium;
    for (let i = 0; i < this.data.length; i++) {
      this.listCirclePercent[i].listItem = this.listItem
        .slice(i * 4, i * 4 + 4)
        .slice(0, 2)
        .concat(this.listItem.slice(i * 4, i * 4 + 4).slice(3, 4));
    }
  }

  insertListLarge() {
    this.screenSize = SCREEN_SIZE.large;
    this.screenSize = 0;
    for (let i = 0; i < this.data.length; i++) {
      this.listCirclePercent[i].listItem = this.listItem.slice(i * 4, i * 4 + 4);
    }
  }
}
