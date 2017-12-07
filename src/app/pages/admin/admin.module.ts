import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {ServerService} from './server/server.service';

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
  providers: [
    ServerService,
  ],
})
export class AdminModule {
}
