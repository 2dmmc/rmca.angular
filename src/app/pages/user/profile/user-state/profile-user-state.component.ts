import {Component, Input} from '@angular/core';

import {UserModel} from '../../../@model/user.model';

@Component({
  selector: 'ngx-profile-user-state',
  styleUrls: ['./profile-user-state.component.scss'],
  templateUrl: './profile-user-state.component.html',
})

export class ProfileUserStateComponent {
  @Input() user: UserModel;

  constructor() {
  }
}
