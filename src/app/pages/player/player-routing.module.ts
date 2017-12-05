import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlayerComponent} from './player.component';
import {RolesComponent} from './roles/roles.component';

const routes: Routes = [{
  path: '',
  component: PlayerComponent,
  children: [{
    path: 'roles',
    component: RolesComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {
}
