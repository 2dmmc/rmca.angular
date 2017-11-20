import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ToasterService} from 'angular2-toaster';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [],
  providers: [
    ToasterService,
  ],
})
export class NoticeModule {
}
