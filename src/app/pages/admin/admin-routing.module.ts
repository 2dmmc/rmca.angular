import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin.component';

// import {NeedAdminGuard} from '../../auth/guards/needAdmin.guard';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  // canActivate: [NeedAdminGuard],
  children: [{
    path: 'rmca',
    loadChildren: './rmca/rmca.module#RmcaModule',
  }, {
    path: 'server',
    loadChildren: './server/server.module#ServerModule',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
