import {Component, Input} from '@angular/core';

import {UserModel} from '../../../@model/user.model';

@Component({
  selector: 'ngx-yggdrasil-state',
  styleUrls: ['./yggdrasil-state.component.scss'],
  templateUrl: './yggdrasil-state.component.html',
})
export class YggdrasilStateComponent {
  @Input() user: UserModel;

  constructor() {
  }
}
