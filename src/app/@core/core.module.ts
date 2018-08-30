import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {ServicesModule} from './services/services.module';
import {DataModule} from './data/data.module';
import {UtilsModule} from './utils/utils.module';
import {GuardsModules} from './guards/guards.modules';

import {RmbPipe} from './pipes';

import {PasswordEqualValidatorDirective, ValueEqualValidatorDirective} from './directives';

export const RMCA_CORE_PROVIDERS = [
  ...ServicesModule.forRoot().providers,
  ...DataModule.forRoot().providers,
  ...UtilsModule.forRoot().providers,
  ...GuardsModules.forRoot().providers,
];

const PIPES = [
  RmbPipe,
];

const DIRECTIVES = [
  PasswordEqualValidatorDirective,
  ValueEqualValidatorDirective,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ...PIPES,
  ],
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...RMCA_CORE_PROVIDERS,
      ],
    };
  }
}
