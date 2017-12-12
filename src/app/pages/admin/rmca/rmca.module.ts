import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {UsersModule} from './users/users.module';
import {UserModule} from './user/user.module';
import {AdminsModule} from './admins/admins.module';

import {RmcaRoutingModule} from './rmca-routing.module';

import {RmcaComponent} from './rmca.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {AdminsComponent} from './admins/admins.component';

import {RmcaService} from './rmca.service';

const components = [
  RmcaComponent,
  UsersComponent,
  UserComponent,
  AdminsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    RmcaRoutingModule,
    UsersModule,
    UserModule,
    AdminsModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    RmcaService,
  ],
})

export class RmcaModule {
}
