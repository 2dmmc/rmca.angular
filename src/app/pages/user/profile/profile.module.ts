import { NgModule } from '@angular/core';

import { ThemeModule } from '../../../@theme/theme.module';
import { UserStateComponent} from './user-state/user-state.component';

const components = [
  UserStateComponent,
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
  providers: [],
})
export class ProfileModule { }
