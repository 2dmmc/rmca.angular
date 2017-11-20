import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {UserStateComponent} from './user-state/user-state.component';

import {ToastService} from '../../../@system/toast/toast.service';
import {UserService} from '../user.service';

const components = [
  UserStateComponent,
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
  providers: [
    ToastService,
    UserService,
  ],
})
export class ProfileModule {
}
