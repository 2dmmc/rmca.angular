import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';
import {FinanceDetailModalComponent} from './finance-detail-modal/finance-detail-modal.component';

const components = [
  FinanceAddModalComponent,
  FinanceDetailModalComponent,
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
  entryComponents: [
    FinanceAddModalComponent,
    FinanceDetailModalComponent,
  ],
})

export class FinanceModule {
}
