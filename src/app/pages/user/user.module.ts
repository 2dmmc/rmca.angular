import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ProfileModule} from './profile/profile.module';
import {YggdrasilModule} from './yggdrasil/yggdrasil.module';
import {SocialsModule} from './socials/socials.module';
import {UserRoutingModule} from './user-routing.module';

import {UserComponent} from './user.component';
import {ProfileComponent} from './profile/profile.component';
import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';
import {SocialsComponent} from './socials/socials.component';

import {UserService} from './user.service';
import {NoticeService} from '../../@system/notice/notice.service';

const components = [
  UserComponent,
  ProfileComponent,
  YggdrasilComponent,
  SocialsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    ProfileModule,
    YggdrasilModule,
    SocialsModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    UserService,
    NoticeService,
  ],
})
export class UserModule {
}
