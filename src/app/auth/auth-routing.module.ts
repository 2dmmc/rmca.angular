import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NbAuthComponent} from './auth.component';
import {NbLoginComponent} from './components/login/login.component';
import {NbLogoutComponent} from './components/logout/logout.component';
import {NbRegisterComponent} from './components/register/register.component';
import {NbRequestPasswordComponent} from './components/request-password/request-password.component';
import {NbResetPasswordComponent} from './components/reset-password/reset-password.component';

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
    },
    {
      path: 'register',
      component: NbRegisterComponent,
    },
    {
      path: 'logout',
      component: NbLogoutComponent,
    },
    {
      path: 'request-password',
      component: NbRequestPasswordComponent,
    },
    {
      path: 'reset-password',
      component: NbResetPasswordComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
