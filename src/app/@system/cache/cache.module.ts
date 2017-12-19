import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {StorageService} from '../storage/storage.service';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [],
  providers: [
    StorageService,
  ],
})
export class CacheModule {
}
