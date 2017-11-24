import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {PlayerRoutingModule} from './player-routing.module';

import {PlayerComponent} from './player.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import {PlayerAddComponent} from './player-add/player-add.component';

import {PlayerService} from './player.service';
import {NoticeService} from '../../@system/notice/notice.service';

const components = [
  PlayerComponent,
  PlayerListComponent,
  PlayerDetailComponent,
  PlayerAddComponent,
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
