import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ThemeModule} from '../../../@theme/theme.module';

import {SocialQQStateComponent} from './qq-state/social-QQ-state.component';
import {SocialWeiboStateComponent} from './weibo-state/social-weibo-state.component';
import {SocialGravatarStateComponent} from './gravatar-state/social-gravatar-state.component';

const components = [
  SocialQQStateComponent,
  SocialWeiboStateComponent,
  SocialGravatarStateComponent,
];

@NgModule({
  imports: [
    RouterModule,
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
})

export class SocialsModule {
}
