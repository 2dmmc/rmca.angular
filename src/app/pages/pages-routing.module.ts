import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

import {NeedAdminService} from '../@core/guards/need-admin.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  }, {
    path: 'player',
    loadChildren: './player/player.module#PlayerModule',
  }, {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [NeedAdminService],
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
