import {ErrorHandler, NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';

import * as fundebug from 'fundebug-javascript';

// const globalServices = [
//   AuthService,
//   AuthUtilService,
//   NoticeService,
// ];
//
// const guardRouter = [
//   UserService,
//   NeedLoginGuard,
//   NeedAdminGuard,
// ];

const PAGES_COMPONENTS = [
  PagesComponent,
];

fundebug.apikey = '1638ea31bc784c1c860a2633d3fa409d3e30e3775917e498a2670e37eaa1b6d3';

export class FundebugErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    fundebug.notifyError(err);
  }
}

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
