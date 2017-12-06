import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';

import {ServerAddModalComponent} from './server-add-modal/server-add-modal.component';
import {ServerDetailModalComponent} from './server-detail-modal/server-detail-modal.component';

const components = [
  ServerAddModalComponent,
  ServerDetailModalComponent,
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
})

export class ServersModule {
}
