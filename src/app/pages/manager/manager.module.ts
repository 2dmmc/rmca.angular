import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
// import {ProfileModule} from './profile/profile.module';
// import {YggdrasilModule} from './yggdrasil/yggdrasil.module';
import {ManagerRoutingModule} from './manager-routing.module';
//
import {ManagerComponent} from './manager.component';
// import {ProfileComponent} from './profile/profile.component';
// import {YggdrasilComponent} from './yggdrasil/yggdrasil.component';
//
// import {UserService} from './user.service';
// import {NoticeService} from '../../@system/notice/notice.service';

const components = [
  ManagerComponent,
  // ProfileComponent,
  // YggdrasilComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ManagerRoutingModule,
    // ProfileModule,
    // YggdrasilModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    // UserService,
    // NoticeService,
  ],
})
export class ManagerModule {
}
