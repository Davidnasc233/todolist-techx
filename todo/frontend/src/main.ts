import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/page/app.config';
import { AppComponent } from './app/page/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
}).catch((err) => console.error(err));


