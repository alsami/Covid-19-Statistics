import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

google.charts.load('current', {
  packages: ['geochart'],
  mapsApiKey: environment.mapsApiKey,
});

if (environment.production) {
  console.log = () => {};
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
