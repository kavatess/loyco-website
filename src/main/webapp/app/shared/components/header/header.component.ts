import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../core/services/auth.service';
import { UserDetailModel } from 'app/models/user-detail.model';
import { TranslateService } from '@ngx-translate/core';
import { getApplicationURL } from 'app/shared/util/app-util';
import { SERVER_API_URL, ROUTES } from 'app/app.constants';
import { SessionStorageService } from 'ngx-webstorage';
import { logoutURL } from 'app/models/common-api-url.model';
import { UserService } from 'app/core/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'ly-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appData = {
    id: 'app-data',
    label: { class: '', text: '' },
    list: []
  };

  languageData = {
    id: 'ly-language-data',
    label: { class: '', text: '' },
  };

  userData = {
    id: 'user-data',
    label: { class: 'ly-appheader-avatar', text: '' },
    list: [
      { key: 'changePassword', icon: '', text: this.translate.instant('menu.changePassword') },
      { key: 'logout', icon: '', text: this.translate.instant('menu.logout') },
    ],
  };
  titleData = {
    actions: this.translate.instant('tab.actions'),
    all: this.translate.instant('tab.all'),
    applications: this.translate.instant('tab.applications'),
    dashboard: this.translate.instant('tab.dashboard'),
    favorites: this.translate.instant('tab.favorites'),
    login: this.translate.instant('tab.login'),
    profiles: this.translate.instant('tab.profiles'),
  };
  hasLogin = false;
  userDetails: any;
  language = ['en', 'fr', 'de'];
  constructor(
    private authService: AuthService,
    public translate: TranslateService,
    private userService: UserService,
    private session: SessionStorageService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.hasLogin = true;
      this.initUserData();
      this.initAppData();
    }
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.hasLogin = event.url !== '/login';
    });
  }
  getEnumString(route: string) {
    switch (route) {
      case 'all':
        return ROUTES.ALL;
      case 'dashboard':
        return ROUTES.DASHBOARD;
      case 'actions':
        return ROUTES.ACTIONS;
      case 'applications':
        return ROUTES.APPLICATIONS;
      case 'favorites':
        return ROUTES.FAVORITES;
      case 'login':
        return ROUTES.LOGIN;
      default:
        return ROUTES.ALL;
    }
  }

  ngOnInit(): void {
    this.initLanguageData();
  }

  initAppData() {
    const listAppKey = JSON.parse(this.session.retrieve('availableApplications') || '[]');
    this.appData['list'] = listAppKey.map((key: string) => ({
      key,
      icon: 'ly-app-icon-small ' + key + '-small',
      text: this.translate.instant('app.' + key + '.name'),
    }));
  }

  initLanguageData() {
    this.languageData.label.class = 'ly-language ly-language-' + this.getCurrentLang();
    const languageObject = this.translate.instant('lang');
    this.languageData['list'] = Object.keys(languageObject).map(key => ({
      key,
      icon: 'ly-language ly-language-' + key,
      text: languageObject[key],
    }));
  }

  initUserData() {
    this.userDetails = JSON.parse(this.session.retrieve('userInfo') + '') as UserDetailModel;
    this.userData.label.text = this.userDetails.userId + ' (' + this.userDetails.email + ')';
    const userOptionObject = this.translate.instant('menu');
    this.userData['list'] = Object.keys(userOptionObject).map(key => ({ key, icon: '', text: userOptionObject[key] }));
  }

  changeLocale($event: any) {
    if (this.language.includes($event) && !this.isForce()) {
      this.session.store('language', { language: $event });
      if (this.authService.isProduction()) {
        this.userService.updateLang($event).subscribe(() => {
          location.reload();
        });
      } else {
        location.reload();
      }
    }
  }
  chooseUserOption($event: any) {
    if ($event === 'logout') {
      sessionStorage.clear();
      localStorage.clear();
      this.authService.isProduction() ? window.location.assign(SERVER_API_URL + logoutURL) : location.reload();
    }
  }
  chooseApp($event: any) {
    const currentLanguage = this.getCurrentLang();
    window.location.assign(SERVER_API_URL + getApplicationURL($event, currentLanguage));
  }
  isForce(): boolean {
    return this.session.retrieve('language')?.force || false;
  }
  getCurrentLang(): string {
    return this.session.retrieve('language')?.language || this.translate.currentLang;
  }
}
