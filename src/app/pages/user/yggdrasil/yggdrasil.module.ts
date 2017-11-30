import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {YggdrasilStateComponent} from './yggdrasil-state/yggdrasil-state.component';
import {YggdrasilInfoComponent} from './yggdrasil-info/yggdrasil-info.component';

const components = [
  YggdrasilStateComponent,
  YggdrasilInfoComponent,
];

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
})
export class YggdrasilModule {
}
