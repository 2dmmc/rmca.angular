import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {RolesModule} from './roles/roles.module';

import {PlayerRoutingModule} from './player-routing.module';

import {PlayerComponent} from './player.component';
import {RolesComponent} from './roles/roles.component';
import {RoleAddModalComponent} from './roles/role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './roles/role-detail-modal/role-detail-modal.component';

import {PlayerService} from './player.service';
import {NoticeService} from '../../@system/notice/notice.service';

const components = [
  PlayerComponent,
  RolesComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PlayerRoutingModule,
    RolesModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    PlayerService,
    NoticeService,
  ],
  entryComponents: [
    RoleAddModalComponent,
    RoleDetailModalComponent,
  ],
})

export class PlayerModule {
}
