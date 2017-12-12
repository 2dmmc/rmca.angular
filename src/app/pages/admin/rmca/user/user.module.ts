import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../../@theme/theme.module';

const components = [];

@NgModule({
  imports: [
    ThemeModule,
  ],
  exports: [
    ...components,
  ],
  declarations: [
    ...components,
  ],
  entryComponents: [],
})

export class UserModule {
}
