import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ToasterModule} from 'angular2-toaster';
import {NoticeService} from './@system/notice/notice.service';

import {NeedLoginGuard} from './auth/guards/needLogin.guard';
import {NeedAdminGuard} from './auth/guards/needAdmin.guard';
import {NeedUnLoginGuard} from './auth/guards/needUnLogin.guard';
import {AuthService} from './auth/services/auth.service';
import {AuthUtilService} from './auth/services/auth-util.service';
import {UserService} from './pages/user/user.service';

import * as fundebug from 'fundebug-javascript';

fundebug.apikey = '1638ea31bc784c1c860a2633d3fa409d3e30e3775917e498a2670e37eaa1b6d3';

export class FundebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ToasterModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: ErrorHandler, useClass: FundebugErrorHandler},
    NeedAdminGuard,
    NeedLoginGuard,
    NeedUnLoginGuard,
    AuthService,
    AuthUtilService,
    UserService,
    NoticeService,
  ],
})

export class AppModule {
}
