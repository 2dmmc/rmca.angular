import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, UserRoutingModule} from './user-routing.module';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileUpdatePasswordComponent} from './profile/update-password/profile-update-password.component';
import {ProfileUserInfoComponent} from './profile/user-info/profile-user-info.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';
import {YggdrasilInfoComponent} from './yggdrasil/yggdrasil-info/yggdrasil-info.component';
import {YggdrasilStateComponent} from './yggdrasil/yggdrasil-state/yggdrasil-state.component';
import {SocialsComponent} from './socials/socials.component';
import {SocialGravatarStateComponent} from './socials/gravatar-state/social-gravatar-state.component';
import {SocialQQStateComponent} from './socials/qq-state/social-QQ-state.component';
import {SocialWeiboStateComponent} from './socials/weibo-state/social-weibo-state.component';

const components = [
  UserComponent,

  ProfileComponent,
  ProfileUpdatePasswordComponent,
  ProfileUserInfoComponent,

  YggdrasilComponent,
  YggdrasilInfoComponent,
  YggdrasilStateComponent,

  SocialsComponent,
  SocialGravatarStateComponent,
  SocialQQStateComponent,
  SocialWeiboStateComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
  ],
  declarations: [
    routedComponents,
    ...components,
  ],
})

export class UserModule {
}
