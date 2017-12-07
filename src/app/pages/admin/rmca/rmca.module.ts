import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {UserModule} from './user/user.module';
import {AdminModule} from './admin/admin.module';

import {RmcaRoutingModule} from './rmca-routing.module';

import {RmcaComponent} from './rmca.component';
import {UserComponent} from './user/user.component';
import {AdminComponent} from './admin/admin.component';

const components = [
  RmcaComponent,
  UserComponent,
  AdminComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    RmcaRoutingModule,
    UserModule,
    AdminModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})

export class RmcaModule {
}
