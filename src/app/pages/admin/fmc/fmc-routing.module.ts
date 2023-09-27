import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FmcComponent} from './fmc.component';
import {ServersComponent} from './servers/servers.component';
import {HistoryComponent} from './history/history.component';
import {FinanceComponent} from './finance/finance.component';

const routes: Routes = [{
  path: '',
  component: FmcComponent,
  children: [{
    path: 'servers',
    component: ServersComponent,
  }, {
    path: 'history',
    component: HistoryComponent,
  }, {
    path: 'finance',
    component: FinanceComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FmcRoutingModule {
}
