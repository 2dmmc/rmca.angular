import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';

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
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule {
}
