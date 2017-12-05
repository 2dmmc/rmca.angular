import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {FinanceHistoryComponent} from './finance-history/finance-history.component';
import {ExternalLinksComponent} from './external-links/external-links.component';

import {DashboardService} from './dashboard.service';

const components = [
  DashboardComponent,
  FinanceHistoryComponent,
  ExternalLinksComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    DashboardService,
  ],
})

export class DashboardModule {
}
