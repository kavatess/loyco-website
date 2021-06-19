import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HomeAngularAppModule } from './app.module';
import { ProdConfig } from './blocks/config/prod.config';

ProdConfig();
if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(HomeAngularAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Application started'))
  .catch(err => console.error(err));
