import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManagerComponent} from './manager.component';
import {ServersComponent} from './servers/servers.component';

import {NeedAdminGuard} from '../../auth/guards/needAdmin.guard';

const routes: Routes = [{
  path: '',
  component: ManagerComponent,
  canActivate: [NeedAdminGuard],
  children: [{
    path: 'rmca',
    // component: ProfileComponent,
  }, {
    path: 'servers',
    component: ServersComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
