import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {AdminGrantModalComponent} from './admin-grant-modal/admin-grant-modal.component';
import {AdminRevokeModalComponent} from './admin-revoke-modal/admin-revoke-modal.component';

const components = [
  AdminGrantModalComponent,
  AdminRevokeModalComponent,
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
    AdminGrantModalComponent,
    AdminRevokeModalComponent,
  ],
})

export class UserModule {
}
