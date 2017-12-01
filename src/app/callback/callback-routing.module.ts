import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CallbackComponent} from './callback.component';
import {OauthQQComponent} from './components/oauth-qq/oauth-QQ.component';
import {OauthWeiboComponent} from './components/oauth-weibo/oauth-weibo.component';

const routes: Routes = [{
  path: '',
  component: CallbackComponent,
  children: [
    {
      path: '',
      component: CallbackComponent,
    },
    {
      path: 'oauth/qq',
      component: OauthQQComponent,
    }, {
      path: 'oauth/weibo',
      component: OauthWeiboComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CallbackRoutingModule {
}
