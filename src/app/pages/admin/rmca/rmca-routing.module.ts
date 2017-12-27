import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RmcaComponent} from './rmca.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [{
  path: '',
  component: RmcaComponent,
  children: [{
    path: 'users',
    component: UsersComponent,
  }, {
    path: 'user/:userId',
    component: UserComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class RmcaRoutingModule {
}
