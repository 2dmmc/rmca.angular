import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {PlayerRoutingModule} from './player-routing.module';

import {PlayerComponent} from './player.component';
import {RolesComponent} from './roles/roles.component';

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
  ],
  declarations: [
    ...components,
  ],
  providers: [
    PlayerService,
    NoticeService,
  ],
})
export class PlayerModule {
}
