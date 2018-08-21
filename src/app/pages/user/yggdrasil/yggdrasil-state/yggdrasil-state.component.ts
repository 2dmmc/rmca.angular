import {Component, Input} from '@angular/core';

import {IUser} from '../../../../@model/common/user/user.interface';

@Component({
  selector: 'ngx-yggdrasil-state',
  styleUrls: ['./yggdrasil-state.component.scss'],
  templateUrl: './yggdrasil-state.component.html',
})
export class YggdrasilStateComponent {
  @Input() user: IUser;

  constructor() {
  }
}
