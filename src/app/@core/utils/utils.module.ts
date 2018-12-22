import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthUtilService} from './auth-util.service';
import {CommonUtilService} from './common-util.service';
import {NoticeUtilService} from './notice-util.service';

const SERVICES = [
  AuthUtilService,
  CommonUtilService,
  NoticeUtilService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class UtilsModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: UtilsModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
