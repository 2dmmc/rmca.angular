import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {UserBanModalComponent} from './user/user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from './user/user-unban-modal/user-unban-modal.component';

const components = [
  UserBanModalComponent,
  UserUnbanModalComponent,
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
  entryComponents: [
    UserBanModalComponent,
    UserUnbanModalComponent,
  ],
})

export class UsersModule {
}
