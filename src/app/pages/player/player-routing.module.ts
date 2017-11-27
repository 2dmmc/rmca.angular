import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PlayerComponent} from './player.component';
import {PlayerListComponent} from './player-list/player-list.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import {PlayerAddComponent} from './player-add/player-add.component';

const routes: Routes = [{
  path: '',
  component: PlayerComponent,
  children: [{
    path: 'list',
    component: PlayerListComponent,
  }, {
    path: 'detail/:id',
    component: PlayerDetailComponent,
  }, {
    path: 'add',
    component: PlayerAddComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {
}
