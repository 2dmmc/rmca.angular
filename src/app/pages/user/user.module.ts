import {NgModule} from '@angular/core';
import {AngularEchartsModule} from 'ngx-echarts';

import {ThemeModule} from '../../@theme/theme.module';
import {UserComponent} from './user.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    UserComponent,
  ],
})
export class UserModule {
}
