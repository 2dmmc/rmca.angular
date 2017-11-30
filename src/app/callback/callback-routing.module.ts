import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CallbackComponent} from './callback.component';
import {CallbackBlockComponent} from './components/callback-block/callback-block.component';

const routes: Routes = [{
  path: '',
  component: CallbackComponent,
  children: [
    {
      path: '',
      component: CallbackBlockComponent,
    },
    {
      path: 'oauth/qq',
      component: CallbackBlockComponent,
    }, {
      path: 'oauth/weibo',
      component: CallbackBlockComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CallbackRoutingModule {
}
