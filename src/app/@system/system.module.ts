import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {ThemeModule} from '../@theme/theme.module';
import {NoticeModule} from './notice/notice.module';
import {CacheModule} from './cache/cache.module';
import {StorageModule} from './storage/storage.module';

@NgModule({
  imports: [
    ThemeModule,
    NoticeModule,
    CacheModule,
    StorageModule,
  ],
  declarations: [],
  providers: []
})
export class SystemModule {
  constructor(@Optional() @SkipSelf() parentModule: SystemModule) {
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: SystemModule,
      providers: [],
    };
  }
}
