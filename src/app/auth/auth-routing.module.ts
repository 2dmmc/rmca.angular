import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './components/login/login.component';
import {LogoutComponent} from './components/logout/logout.component';
import {RegisterComponent} from './components/register/register.component';
import {RequestPasswordComponent} from './components/request-password/request-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: '',
      component: LoginComponent,
    }, {
      path: 'login',
      component: LoginComponent,
    }, {
      path: 'register',
      component: RegisterComponent,
    }, {
      path: 'request-password',
      component: RequestPasswordComponent,
    }, {
      path: 'reset-password',
      component: ResetPasswordComponent,
    }, {
      path: 'logout',
      component: LogoutComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule {
}
