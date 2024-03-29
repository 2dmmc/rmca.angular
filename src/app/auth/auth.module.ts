import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {AuthComponent} from './auth.component';
import {AuthBlockComponent} from './components/auth-block/auth-block.component';
import {AuthNoticeComponent} from './components/auth-notice/auth-notice.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RegisterComponent} from './components/register/register.component';
import {RequestPasswordComponent} from './components/request-password/request-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';


const AUTH_COMPONENTS = [
  AuthComponent,
  AuthBlockComponent,
  AuthNoticeComponent,
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  RequestPasswordComponent,
  ResetPasswordComponent,
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...AUTH_COMPONENTS,
  ],
})

export class AuthModule {
}
