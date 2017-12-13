import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

import {AdminGrantModalComponent} from './admin-grant-modal/admin-grant-modal.component';
import {AdminRevokeModalComponent} from './admin-revoke-modal/admin-revoke-modal.component';
import {EnterImpersonateModalComponent} from './enter-impersonate-modal/enter-impersonate-modal.component';

const components = [
  AdminGrantModalComponent,
  AdminRevokeModalComponent,
  EnterImpersonateModalComponent,
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
    EnterImpersonateModalComponent,
  ],
})

export class UserModule {
}
