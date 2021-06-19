import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { ActionsModule } from 'app/modules/actions/actions.module';
import { ApplicationsModule } from 'app/modules/applications/applications.module';
import { DashboardModule } from 'app/modules/dashboard/dashboard.module';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  declarations: [FavoritesComponent],
  imports: [CommonModule, ActionsModule, ApplicationsModule, DashboardModule, SharedModule],
})
export class FavoritesModule {}
