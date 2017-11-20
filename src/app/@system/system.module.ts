import {NgModule} from '@angular/core';

import {ThemeModule} from '../@theme/theme.module';
import {ToastModule} from './toast/toast.module';

@NgModule({
  imports: [
    ThemeModule,
    ToastModule,
  ],
  declarations: [],
})
export class SystemModule {
}
