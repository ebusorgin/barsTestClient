import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import {routing} from './app.routing.module';

import {FormsModule} from '@angular/forms';
import {MainComponent} from './pages/main/main.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuard} from './auth.guard';
import {AuthService} from './_services/auth.service';
import {DataService} from './_services/data.service';
import {CookieService} from 'ngx-cookie-service';

import { FileDropDirective, FileSelectDirective} from 'ng2-file-upload';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
  ],
  providers: [
    AuthGuard,
    AuthService,
    DataService,
    CookieService
  ],
  schemas:      [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
