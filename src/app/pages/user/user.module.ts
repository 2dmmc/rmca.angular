import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {routedComponents, UserRoutingModule} from './user-routing.module';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileUserInfoComponent} from './profile/user-info/profile-user-info.component';
import {ProfileUserPasswordComponent} from './profile/user-password/profile-user-password.component';
import {ProfileUserStateComponent} from './profile/user-state/profile-user-state.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';
import {YggdrasilInfoComponent} from './yggdrasil/yggdrasil-info/yggdrasil-info.component';
import {YggdrasilStateComponent} from './yggdrasil/yggdrasil-state/yggdrasil-state.component';
import {SocialsComponent} from './socials/socials.component';
import {SocialGravatarStateComponent} from './socials/gravatar-state/social-gravatar-state.component';
import {SocialQQStateComponent} from './socials/qq-state/social-QQ-state.component';
import {SocialWeiboStateComponent} from './socials/weibo-state/social-weibo-state.component';

import {UserService} from './user.service';

const components = [
  UserComponent,
  ProfileComponent,
  ProfileUserInfoComponent,
  ProfileUserPasswordComponent,
  ProfileUserStateComponent,
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
  providers: [
    UserService,
  ],
})

export class UserModule {
}
