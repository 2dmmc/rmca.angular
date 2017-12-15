import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';
import {SocialsComponent} from './socials/socials.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'profile',
    component: ProfileComponent,
  }, {
    path: 'yggdrasil',
    component: YggdrasilComponent,
  }, {
    path: 'socials',
    component: SocialsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}

export const routedComponents = [
  UserComponent,
  ProfileComponent,
  YggdrasilComponent,
  SocialsComponent,
];
