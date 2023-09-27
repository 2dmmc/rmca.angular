import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NoticeService} from './notice.service';
import {StorageService} from './storage.service';
import {RouteService} from './route.service';

const SERVICES = [
  NoticeService,
  StorageService,
  RouteService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
