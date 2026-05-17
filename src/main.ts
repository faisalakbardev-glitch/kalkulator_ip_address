import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withHashLocation } from '@angular/router'; // 👈 Tambah import withHashLocation di sini
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Kita tambahkan dengan withHashLocation() di dalam fungsi provideRouter, bro 👇
    provideRouter(routes, withPreloading(PreloadAllModules), withHashLocation()),
  ],
});