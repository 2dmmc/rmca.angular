import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NeedLoginGuard} from './@core/guards/need-login.guard';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [NeedLoginGuard],
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
