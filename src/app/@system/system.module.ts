import {NgModule} from '@angular/core';

import {ThemeModule} from '../@theme/theme.module';
import {NoticeModule} from './notice/notice.module';

@NgModule({
  imports: [
    ThemeModule,
    NoticeModule,
  ],
  declarations: [],
})
export class SystemModule {
}
