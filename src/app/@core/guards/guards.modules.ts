import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NeedLoginService} from './need-login.service';
import {NeedAdminService} from './need-admin.service';

const SERVICES = [
  NeedLoginService,
  NeedAdminService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class GuardsModules {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: GuardsModules,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
