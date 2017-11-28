import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ManagerComponent} from './manager.component';

import {NeedAdminGuard} from '../../auth/guards/needAdmin.guard';

const routes: Routes = [{
  path: '',
  component: ManagerComponent,
  canActivate: [NeedAdminGuard],
  children: [{
    path: 'rmca',
    // component: ProfileComponent,
  }, {
    path: 'server',
    // component: YggdrasilComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {
}
