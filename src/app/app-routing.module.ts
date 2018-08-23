import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NeedLoginService} from './@core/guards/need-login.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [NeedLoginService],
  }, {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
  }, {
    path: 'callback',
    loadChildren: 'app/callback/callback.module#CallbackModule',
  },
  {path: '', redirectTo: 'pages', pathMatch: 'full'},
  {path: '**', redirectTo: 'pages'},
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
