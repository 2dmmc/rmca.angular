import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {ServersModule} from './servers/servers.module';
import {FinanceModule} from './finance/finance.module';

import {ServerRoutingModule} from './server-routing.module';

import {ServerComponent} from './server.component';
import {ServersComponent} from './servers/servers.component';
import {FinanceComponent} from './finance/finance.component';

const components = [
  ServerComponent,
  ServersComponent,
  FinanceComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ServerRoutingModule,
    ServersModule,
    FinanceModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})

export class ServerModule {
}
