import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {ServersModule} from './servers/servers.module';
import {ManagerRoutingModule} from './manager-routing.module';

import {ManagerComponent} from './manager.component';
import {ServersComponent} from './servers/servers.component';
import {ServerAddModalComponent} from './servers/server-add-modal/server-add-modal.component';
import {ServerDetailModalComponent} from './servers/server-detail-modal/server-detail-modal.component';
import {ServerDeleteModalComponent} from './servers/server-delete-modal/server-delete-modal.component';

import {ManagerService} from './manager.service';

const components = [
  ManagerComponent,
  ServersComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ManagerRoutingModule,
    ServersModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    ManagerService,
  ],
  entryComponents: [
    ServerAddModalComponent,
    ServerDetailModalComponent,
    ServerDeleteModalComponent,
  ],
})
export class ManagerModule {
}
