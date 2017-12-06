import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {UserService} from './user/user.service';
import {AuthService} from '../auth/services/auth.service';
import {AuthUtilService} from '../auth/services/auth-util.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    UserService,
    AuthService,
    AuthUtilService,
  ],
})

export class PagesModule {
}
