import {NgModule} from '@angular/core';

import {AuthRoutingModule} from './auth-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {NbAuthComponent} from './auth.component';
import {NbAuthBlockComponent} from './components/auth-block/auth-block.component';
import {NbLoginComponent} from './components/login/login.component';
import {NbLogoutComponent} from './components/logout/logout.component';
import {NbRegisterComponent} from './components/register/register.component';
import {NbRequestPasswordComponent} from './components/request-password/request-password.component';
import {NbResetPasswordComponent} from './components/reset-password/reset-password.component';

import {AuthService} from '../@core/data/auth.service';
import {AuthUtilService} from '../@core/utils/auth-util.service';

import {UserService} from '../pages/user/user.service';
// import {NeedLoginGuard} from './guards/needLogin.guard';
// import {NeedAdminGuard} from './guards/needAdmin.guard';

const AUTH_COMPONENTS = [
  NbAuthComponent,
  NbAuthBlockComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...AUTH_COMPONENTS,
  ],
  providers: [
    UserService,
    AuthService,
    AuthUtilService,

    // NeedLoginGuard,
    // NeedAdminGuard,
  ],
})

export class AuthModule {
}
