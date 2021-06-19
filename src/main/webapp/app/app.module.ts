import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { LogInModule } from './modules/login/log-in.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from 'app/blocks/interceptor/request.interceptor';
import { ErrorHandlerInterceptor } from 'app/blocks/interceptor/errorhandler.interceptor';
import { DEFAULT_LANGUAGE } from './app.constants';
import { NgxWebstorageModule } from 'ngx-webstorage';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    NgxWebstorageModule.forRoot(),
    AppRoutingModule,
    HomeModule,
    LogInModule,
    FavoritesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: DEFAULT_LANGUAGE,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class HomeAngularAppModule {}
