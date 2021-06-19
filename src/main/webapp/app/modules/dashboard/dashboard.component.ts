import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './../../models/base.component';
import { MODULES, ROLES, WIDGETS } from 'app/app.constants';
import { SessionStorageService } from 'ngx-webstorage';
import { NanoDonationSetupInfo } from 'app/models/nano-donation-model';
@Component({
  selector: 'ly-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  nanoDonationSetupInfo: NanoDonationSetupInfo;
  constructor(session: SessionStorageService) {
    super(session);
    try {
      this.nanoDonationSetupInfo = JSON.parse(this.session.retrieve('nanoDonationSetupInfo'));
    } catch {
      this.nanoDonationSetupInfo = new NanoDonationSetupInfo();
    }
  }
  ngOnInit(): void {
    if (this.activatedModule(MODULES.PLAN_ABSENCE_MODULE)) {
      if (this.hasRole(ROLES.LOYAPPS_EMPLOYEE)) {
        if (JSON.parse(this.session.retrieve('hasBalanceSetup'))) {
          this.data.set(WIDGETS.BALANCE, true);
        }
        this.data.set(WIDGETS.TEAM_ABSENCES, true);
        this.data.set(WIDGETS.NEXT_ABSENCES_WIDGET, true);
        if (this.hasRole(ROLES.XX_GP_Employee)) {
          this.data.set(WIDGETS.PAYSLIPS, true);
        }
      }
      if (this.hasRole(ROLES.LOYAPPS_MANAGER)) {
        this.data.set(WIDGETS.ABSENCES_TO_BE_VALIDATED, true);
      }
    }
    if (this.activatedModule(MODULES.NANODONATION_MODULE)) {
      if (this.hasRole(ROLES.XX_GP_Employee) || this.hasRole(ROLES.LOYAPPS_USER)) {
        this.data.set(WIDGETS.NANODONATIONS, this.nanoDonationSetupInfo ? this.nanoDonationSetupInfo.DisplayEeWidget === 1 : false);
      }
    }
    if (this.hasRole(ROLES.LOYAPPS_MANAGER) && this.activatedModule(MODULES.TIMESHEET_MODULE)) {
      this.data.set(WIDGETS.TIMESHEET_VALIDATION_WIDGET, true);
    }
  }
}
