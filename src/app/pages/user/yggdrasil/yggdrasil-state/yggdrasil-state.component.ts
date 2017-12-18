import {Component, Input} from '@angular/core';

import {User} from '../../../../@model/user/user.interface';

@Component({
  selector: 'ngx-yggdrasil-state',
  styleUrls: ['./yggdrasil-state.component.scss'],
  templateUrl: './yggdrasil-state.component.html',
})
export class YggdrasilStateComponent {
  @Input() user: User;

  constructor() {
  }
}
