import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
// import {UserStateComponent} from './user-state/user-state.component';

import {NoticeService} from '../../../@system/notice/notice.service';
import {UserService} from '../user.service';

const components = [
  // UserStateComponent,
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
    NoticeService,
    UserService,
  ],
})
export class YggdrasilModule {
}
