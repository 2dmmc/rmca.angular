import {NgModule} from '@angular/core';

import {CallbackRoutingModule} from './callback-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {CallbackService} from './services/callback.service';
import {CallbackUtilService} from './services/callback-util.service';

import {CallbackComponent} from './callback.component';
import {CallbackBlockComponent} from './components/callback-block/callback-block.component';

import {UserService} from '../pages/user/user.service';

const components = [
  CallbackComponent,
  CallbackBlockComponent,
];

@NgModule({
  imports: [
    CallbackRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    UserService,
    CallbackService,
    CallbackUtilService,
  ],
})
export class CallbackModule {
}
