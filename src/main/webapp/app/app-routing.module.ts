import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from 'app/modules/actions/actions.component';
import { ApplicationsComponent } from 'app/modules/applications/applications.component';
import { DashboardComponent } from 'app/modules/dashboard/dashboard.component';
import { FavoritesComponent } from 'app/modules/favorites/favorites.component';
import { HomeComponent } from 'app/modules/home/home.component';
import { ROUTES } from './app.constants';
import { LogInComponent } from 'app/modules/login/log-in.component';
import { AuthGuard } from 'app/blocks/guard/auth.guard';
import { LoginGuard } from 'app/blocks/guard/login.guard';
const routes: Routes = [
  {
    path: ROUTES.ALL,
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: ROUTES.DASHBOARD,
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: ROUTES.ACTIONS,
    canActivate: [AuthGuard],
    component: ActionsComponent,
  },
  {
    path: ROUTES.APPLICATIONS,
    canActivate: [AuthGuard],
    component: ApplicationsComponent,
  },
  {
    path: ROUTES.LOGIN,
    canActivate: [LoginGuard],
    component: LogInComponent,
  },
  {
    path: ROUTES.FAVORITES,
    canActivate: [AuthGuard],
    component: FavoritesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
