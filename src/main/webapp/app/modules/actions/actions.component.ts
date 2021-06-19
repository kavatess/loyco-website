import { Component, OnInit } from '@angular/core';

import { BaseComponent } from 'app/models/base.component';
import { ROLES, MODULES, WIDGETS } from 'app/app.constants';
import { SessionStorageService } from 'ngx-webstorage';
@Component({
  selector: 'ly-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent extends BaseComponent implements OnInit {
  constructor(session: SessionStorageService) {
    super(session);
  }
  ngOnInit(): void {
    if ((this.hasRole(ROLES.XX_GP_Employee) || this.hasRole(ROLES.LOYAPPS_USER)) && this.activatedModule(MODULES.NANODONATION_MODULE)) {
      this.data.set(WIDGETS.NANO_DONATION_FORM, true);
    }
    if (this.hasRole(ROLES.LOYAPPS_EMPLOYEE) && this.activatedModule(MODULES.PLAN_ABSENCE_MODULE)) {
      this.data.set('create-absence-form', true);
    }
  }
}
