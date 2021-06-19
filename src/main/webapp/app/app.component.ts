import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { UserService } from 'app/core/services/user.service';
// Import new language here
import { en, fr, de } from '../i18n';
import { AuthService } from './core/services/auth.service';
import { BalanceDashboardService } from './core/services/balance-dashboard.service';
import { NanoDonationListService } from './core/services/nano-donation-list.service';
import { UserDetailModel } from './models/user-detail.model';
import { MIN_MEDIUM_WIDTH, ROUTES, ROLES } from './app.constants';
import { FavoriteService } from 'app/core/services/favorite.service';
import { SessionStorageService } from 'ngx-webstorage';
import { DateAdapter } from '@angular/material/core';
import { filter } from 'rxjs/operators';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import 'moment/locale/de';
@Component({
  selector: 'ly-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  visible = false;
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private authService: AuthService,
    private nanoService: NanoDonationListService,
    private balanceService: BalanceDashboardService,
    private route: Router,
    private favoriteService: FavoriteService,
    private session: SessionStorageService,
    private dateAdapter: DateAdapter<any>
  ) {
    // Set language
    translate.setTranslation('en', en);
    translate.setTranslation('fr', fr);
    translate.setTranslation('de', de);
    translate.use(this.session.retrieve('language')?.language || this.translate.defaultLang);

    const currentLanguage = this.session.retrieve('language')?.language || this.translate.defaultLang;
    moment.updateLocale(currentLanguage, { week: { dow: 1 } });
    if (this.session.retrieve('language')) {
      this.dateAdapter.setLocale(this.session.retrieve('language')?.language);
    }
    this.changeRouteBySize();

    this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.authService.isAuthenticated() && this.getFavoriteData();
    });
  }
  changeRouteBySize(): void {
    window.innerWidth < MIN_MEDIUM_WIDTH ? this.route.navigateByUrl(ROUTES.DASHBOARD) : this.route.navigateByUrl(ROUTES.ALL);
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < MIN_MEDIUM_WIDTH && location.href.includes(ROUTES.ALL)) {
      this.route.navigateByUrl(ROUTES.DASHBOARD);
    }
  }

  ngOnInit(): void {
    this.authService.isAuthenticated() ? this.getFavoriteData() : (this.visible = true);
  }
  private combineObservables(): Observable<any[]> {
    const observableArray = [];
    if (!this.session.retrieve('employeeID')) {
      observableArray.push(this.userService.getEmployeeID());
    }
    if (!this.session.retrieve('language')) {
      observableArray.push(this.userService.getLang());
    }
    if (!this.session.retrieve('hasBalanceSetup')) {
      observableArray.push(this.balanceService.getBalanceSetUp());
    }
    if (!this.session.retrieve('availableApplications')) {
      observableArray.push(this.userService.getAvailableApplication());
    }
    if (!this.session.retrieve('userInfo')) {
      observableArray.push(this.userService.getUserData());
    }
    if (!this.session.retrieve('activatedModules')) {
      observableArray.push(this.userService.getActiveModule());
    }
    return forkJoin(observableArray);
  }

  private getCompletedData() {
    return this.combineObservables()
      .subscribe(data => {
        if (data && data.length) {
          let count = 0;
          if (!this.session.retrieve('employeeID')) {
            this.session.store('employeeID', data[count++].result);
          }
          if (!this.session.retrieve('language')) {
            this.session.store('language', JSON.parse(data[count++].result));
          }
          if (!this.session.retrieve('hasBalanceSetup')) {
            this.session.store('hasBalanceSetup', data[count++].result);
          }
          if (!this.session.retrieve('availableApplications')) {
            this.session.store('availableApplications', data[count++].result);
          }
          if (!this.session.retrieve('userInfo')) {
            this.session.store('userInfo', data[count++].result);
          }
          if (!this.session.retrieve('activatedModules')) {
            this.session.store('activatedModules', data[count++].result);
          }
          this.translate.use(this.session.retrieve('language')?.language || this.translate.defaultLang);
        }
      })
      .add(async () => {
        const userDetail: UserDetailModel = JSON.parse(this.session.retrieve('userInfo')) || new UserDetailModel();
        if (
          (userDetail.roles.includes(ROLES.LOYAPPS_USER) || userDetail.roles.includes(ROLES.XX_GP_Employee)) &&
          !this.session.retrieve('nanoDonationSetupInfo')
        ) {
          await this.nanoService
            .getNanoDonationSetupInfo()
            .toPromise()
            .then(data => {
              this.session.store('nanoDonationSetupInfo', data.result);
            });
        }
        this.visible = true;
      });
  }

  getFavoriteData() {
    this.favoriteService.getFavoriteData().subscribe(() => {
      this.getCompletedData();
    });
  }
}
