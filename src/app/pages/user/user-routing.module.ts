import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'profile',
    component: ProfileComponent,
  }, {
    path: 'yggdrasil',
    component: YggdrasilComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
