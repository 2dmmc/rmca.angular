import {NgModule} from '@angular/core';

import {ThemeModule} from '../../../@theme/theme.module';
import {YggdrasilStateComponent} from './yggdrasil-state/yggdrasil-state.component';

const components = [
  YggdrasilStateComponent,
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
