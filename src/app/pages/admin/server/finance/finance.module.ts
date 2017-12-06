import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';

const components = [
  FinanceAddModalComponent,
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
  ],
})

export class FinanceModule {
}
