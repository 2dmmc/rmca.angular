import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ProfileModule} from './profile/profile.module';
import {UserRoutingModule} from './user-routing.module';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';

const components = [
  UserComponent,
  ProfileComponent,
  YggdrasilComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    ProfileModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})
export class UserModule {
}
