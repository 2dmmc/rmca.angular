import {NgModule} from '@angular/core';

import {CallbackRoutingModule} from './callback-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {CallbackService} from './services/callback.service';
import {CallbackUtilService} from './services/callback-util.service';

import {CallbackComponent} from './callback.component';
import {CallbackBlockComponent} from './components/callback-block/callback-block.component';
import {OauthQQComponent} from './components/oauth-qq/oauth-QQ.component';
import {OauthWeiboComponent} from './components/oauth-weibo/oauth-weibo.component';

import {UserService} from '../pages/user/user.service';

const components = [
  CallbackComponent,
  CallbackBlockComponent,
  OauthQQComponent,
  OauthWeiboComponent,
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
