import { Component } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { SessionStorageService } from 'ngx-webstorage';
import { DATE_FORMAT, EMPTY_STRING, SERVER_API_URL } from 'app/app.constants';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { BaseWidget } from 'app/models/base-widget.component';
import { UserService } from 'app/core/services/user.service';

@Component({
  selector: 'ly-password-popup',
  template: EMPTY_STRING,
})
export class PasswordPopupComponent extends BaseWidget {
  showNotification = this.authService.isAuthenticated();
  notificationContent = EMPTY_STRING;
  identityNavigationURL = SERVER_API_URL + '/identity/faces/changepwd.jsf?backUrl=' + window.location.origin + window.location.pathname;

  constructor(
    private authService: AuthService,
    private session: SessionStorageService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private userService: UserService
  ) {
    super();
  }

  onDataLoaded(): void {
    super.onDataLoaded();
    if (!this.data || sessionStorage?.getItem('nofiticationClosed') === 'true') {
      this.showNotification = false;
    } else {
      this.showNotification = this.authService.isAuthenticated() && (this.isPasswordExpiringIn35Days() || !this.data.passwordExpireDate);
    }
    if (this.showNotification) {
      this.showPasswordExpirePopup();
    }
  }

  isPasswordExpiringIn35Days() {
    const maxNumOfExpirationDate = moment().add(35, 'days');
    if (moment(new Date(this.data.passwordExpireDate)).isBefore(maxNumOfExpirationDate)) {
      return true;
    }
    return false;
  }

  showPasswordExpirePopup(): void {
    const passwordTitleTranslate = this.translate.instant('popup.password.title');
    const popupWarningTitleTranslate = this.translate.instant('popup.warning');
    this.notificationContent = this.isPasswordExpiringIn35Days()
      ? 'popup.currentPwdExpiredIn35Days.content'
      : !this.data.passwordExpireDate
      ? 'popup.initialPwdNotChanged.content'
      : EMPTY_STRING;
    const notificationContentTranslate = this.translate.instant(this.notificationContent, {
      value: moment(new Date(this.data.passwordExpireDate)).format(DATE_FORMAT),
    });
    const navigationLinkTranslate = this.translate.instant('popup.password.link');
    this.toastr
      .warning(
        `
        <div class="header">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        <span id="nofitication-header">${popupWarningTitleTranslate}</span>
        </div>
        <p>
        <strong>${passwordTitleTranslate}</strong>
        </p>
        <p>
        ${notificationContentTranslate}
        <a href="${this.identityNavigationURL}" id="here">${navigationLinkTranslate}</a>
        </p>`,
        '',
        {
          closeButton: true,
          enableHtml: true,
          disableTimeOut: true,
          tapToDismiss: false,
          toastClass: 'ngx-toastr ly-x-lg-widget-container',
        }
      )
      .onHidden.subscribe(() => this.close());
  }

  getDataObservable() {
    return this.userService.getUserData();
  }

  getNoDataMessage() {
    return EMPTY_STRING;
  }

  getViewMoreLink() {
    return EMPTY_STRING;
  }

  close(): void {
    sessionStorage.setItem('nofiticationClosed', 'true');
  }
}
