import {Component, Input} from '@angular/core';

import {User} from '../../../../@model/user/user.interface';

@Component({
  selector: 'ngx-profile-user-state',
  styleUrls: ['./profile-user-state.component.scss'],
  templateUrl: './profile-user-state.component.html',
})

export class ProfileUserStateComponent {
  @Input() user: User;

  constructor() {
  }
}
