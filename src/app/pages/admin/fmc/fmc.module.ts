import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {ServersModule} from './servers/servers.module';
import {HistoryModule} from './history/history.module';
import {FinanceModule} from './finance/finance.module';

import {FmcRoutingModule} from './fmc-routing.module';

import {FmcComponent} from './fmc.component';
import {ServersComponent} from './servers/servers.component';
import {HistoryComponent} from './history/history.component';
import {FinanceComponent} from './finance/finance.component';

const components = [
  FmcComponent,
  ServersComponent,
  HistoryComponent,
  FinanceComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    FmcRoutingModule,
    ServersModule,
    FinanceModule,
    HistoryModule,
  ],
  declarations: [
    ...components,
  ],
})

export class FmcModule {
}
