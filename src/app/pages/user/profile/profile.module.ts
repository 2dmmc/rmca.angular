import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {UserStateComponent} from './user-state/user-state.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserPasswordComponent} from './user-password/user-password.component';

const components = [
  UserStateComponent,
  UserInfoComponent,
  UserPasswordComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
})
export class ProfileModule {
}
