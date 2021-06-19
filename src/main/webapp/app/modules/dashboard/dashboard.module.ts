import { NgModule } from '@angular/core';
import { NextAbsenceTableComponent } from './components/next-absence-table/next-absence-table.component';
import { BalanceDashboardComponent } from './components/balance-dashboard/balance-dashboard.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { NanoDonationItemComponent } from './components/nano-donation-item/nano-donation-item.component';
import { NanoDonationComponent } from './components/nano-donation/nano-donation.component';
import { PayslipsComponent } from './components/payslips/payslips.component';
import { TeamAbsencesComponent } from './components/team-absences/team-absences.component';
import { TeamAbsencesInfoComponent } from './components/team-absences-info/team-absences-info.component';
import { DateStringFromNow } from 'app/shared/pipes/dateStringFromNow.pipe';
import { BalanceItemComponent } from './components/balance-item/balance-item.component';
import { AbsencesToBeValidatedComponent } from './components/absences-to-be-validated/absences-to-be-validated.component';
import { TimesheetValidationComponent } from './components/timesheet-validation/timesheet-validation.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AbsencesToBeValidatedComponent,
    BalanceDashboardComponent,
    ProgressCircleComponent,
    BalanceItemComponent,
    NextAbsenceTableComponent,
    TeamAbsencesComponent,
    TeamAbsencesInfoComponent,
    DateStringFromNow,
    PayslipsComponent,
    TimesheetValidationComponent,
    NanoDonationItemComponent,
    NanoDonationComponent,
  ],
  imports: [SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
