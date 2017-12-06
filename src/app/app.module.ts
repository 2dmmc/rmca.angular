import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
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
