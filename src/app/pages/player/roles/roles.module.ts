import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';

import {RoleAddModalComponent} from './role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './role-detail-modal/role-detail-modal.component';

const components = [
  RoleAddModalComponent,
  RoleDetailModalComponent,
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

export class RolesModule {
}
