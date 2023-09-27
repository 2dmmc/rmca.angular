import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthService} from './auth.service';
import {CallbackService} from './callback.service';
import {UserService} from './user.service';
import {FmcService} from './fmc.service';

const SERVICES = [
  AuthService,
  CallbackService,
  UserService,
  FmcService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
