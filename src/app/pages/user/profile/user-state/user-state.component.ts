import {Component, Input} from '@angular/core';

import {UserModel} from '../../../@model/user.model';

@Component({
  selector: 'ngx-user-state',
  styleUrls: ['./user-state.component.scss'],
  templateUrl: './user-state.component.html',
})

export class UserStateComponent {
  @Input() user: UserModel;

  constructor() {
  }
}
