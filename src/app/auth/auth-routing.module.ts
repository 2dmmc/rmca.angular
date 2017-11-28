import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NbAuthComponent} from './auth.component';
import {NbLoginComponent} from './components/login/login.component';
import {NbLogoutComponent} from './components/logout/logout.component';
import {NbRegisterComponent} from './components/register/register.component';
import {NbRequestPasswordComponent} from './components/request-password/request-password.component';
import {NbResetPasswordComponent} from './components/reset-password/reset-password.component';

import {NeedUnLoginGuard} from './guards/needUnLogin.guard';

const routes: Routes = [{
  path: '',
  component: NbAuthComponent,
  children: [
    {
      path: '',
      component: NbLoginComponent,
    },
    {
      path: 'login',
      component: NbLoginComponent,
      canActivate: [NeedUnLoginGuard],
    },
    {
      path: 'register',
      component: NbRegisterComponent,
    },
    {
      path: 'request-password',
      component: NbRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NbResetPasswordComponent,
    }, {
      path: 'logout',
      component: NbLogoutComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
