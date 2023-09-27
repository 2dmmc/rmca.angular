import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';

const components = [
  AdminComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
  ],
  declarations: [
    ...components,
  ],
})
export class AdminModule {
}
