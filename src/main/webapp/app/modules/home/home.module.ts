import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsModule } from 'app/modules/actions/actions.module';
import { ApplicationsModule } from 'app/modules/applications/applications.module';
import { DashboardModule } from 'app/modules/dashboard/dashboard.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, DashboardModule, ApplicationsModule, ActionsModule],
})
export class HomeModule {}
