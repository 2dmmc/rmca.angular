import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {YggdrasilStateComponent} from './yggdrasil-state/yggdrasil-state.component';

import {NoticeService} from '../../../@system/notice/notice.service';
import {UserService} from '../user.service';

const components = [
  YggdrasilStateComponent,
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
