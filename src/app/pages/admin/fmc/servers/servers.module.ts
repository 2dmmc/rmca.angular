import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {ServerAddModalComponent} from './server-add-modal/server-add-modal.component';
import {ServerDetailModalComponent} from './server-detail-modal/server-detail-modal.component';
import {ServerDeleteModalComponent} from './server-delete-modal/server-delete-modal.component';

const components = [
  ServerAddModalComponent,
  ServerDetailModalComponent,
  ServerDeleteModalComponent,
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
  entryComponents: [
    ServerAddModalComponent,
    ServerDetailModalComponent,
    ServerDeleteModalComponent,
  ],
})

export class ServersModule {
}
