import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NeedLoginGuard} from './need-login.guard';
import {NeedAdminGuard} from './need-admin.guard';

const SERVICES = [
  NeedLoginGuard,
  NeedAdminGuard,
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
