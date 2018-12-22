import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {PlayerRoutingModule, routedComponents} from './player-routing.module';

import {PlayerComponent} from './player.component';
import {RolesComponent} from './roles/roles.component';
import {RoleAddModalComponent} from './roles/role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './roles/role-detail-modal/role-detail-modal.component';

import {PlayerService} from '../../@core/data/player.service';

const components = [
  PlayerComponent,
  RolesComponent,
  RoleAddModalComponent,
  RoleDetailModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    PlayerRoutingModule,
  ],
  declarations: [
    ...components,
    routedComponents,
  ],
  providers: [
    PlayerService,
  ],
  entryComponents: [
    RoleAddModalComponent,
    RoleDetailModalComponent,
  ],
})

export class PlayerModule {
}
