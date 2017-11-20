import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';

import {AuthService} from '../auth/services/auth.service';

import {ToastComponent, ToasterContainerComponent, ToasterService} from 'angular2-toaster/angular2-toaster';

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
    ToasterContainerComponent,
    ToastComponent,
  ],
  providers: [
    AuthService,
    ToasterService,
  ],
})
export class PagesModule {
}
