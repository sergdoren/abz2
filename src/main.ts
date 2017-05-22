import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  this.base = '/abz/dist';
}else{
  this.base = '/';
}

platformBrowserDynamic().bootstrapModule(AppModule);
