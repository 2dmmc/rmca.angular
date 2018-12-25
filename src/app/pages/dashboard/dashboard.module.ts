import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {FinanceHistoryComponent} from './finance-history/finance-history.component';
import {ExternalLinksComponent} from './external-links/external-links.component';
import {AdComponent} from './ad/ad.component';

import {DashboardService} from './dashboard.service';
import {AdsenseModule} from 'ng2-adsense';

const components = [
  DashboardComponent,
  FinanceHistoryComponent,
  ExternalLinksComponent,
  AdComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-9476186504912637',
      adSlot: 1855875521,
    }),
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
