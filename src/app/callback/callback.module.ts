import {NgModule} from '@angular/core';

import {CallbackRoutingModule} from './callback-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {CallbackComponent} from './callback.component';
import {CallbackNoticeComponent} from './components/callback-notice/callback-notice.component';
import {CallbackBlockComponent} from './components/callback-block/callback-block.component';
import {OauthQQComponent} from './components/oauth-qq/oauth-QQ.component';
import {OauthWeiboComponent} from './components/oauth-weibo/oauth-weibo.component';
import {LoginQQComponent} from './components/login-qq/login-QQ.component';
import {LoginWeiboComponent} from './components/login-weibo/login-weibo.component';

const components = [
  CallbackComponent,
  CallbackNoticeComponent,
  CallbackBlockComponent,
  OauthQQComponent,
  OauthWeiboComponent,
  LoginQQComponent,
  LoginWeiboComponent,
];

@NgModule({
  imports: [
    CallbackRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...components,
  ],
})

export class CallbackModule {
}
