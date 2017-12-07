import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {UsersModule} from './users/users.module';
import {AdminsModule} from './admins/admins.module';

import {RmcaRoutingModule} from './rmca-routing.module';

import {RmcaComponent} from './rmca.component';
import {UsersComponent} from './users/users.component';
import {AdminsComponent} from './admins/admins.component';

const components = [
  RmcaComponent,
  UsersComponent,
  AdminsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    RmcaRoutingModule,
    UsersModule,
    AdminsModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [],
})

export class RmcaModule {
}
