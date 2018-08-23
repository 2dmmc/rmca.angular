import {Component, Input, OnInit} from '@angular/core';

import {IUser} from '../../../../@model/common/user/user.interface';

@Component({
  selector: 'ngx-profile-user-state',
  styleUrls: ['./profile-user-state.component.scss'],
  templateUrl: './profile-user-state.component.html',
})

export class ProfileUserStateComponent implements OnInit {
  @Input() user: IUser;
  userState: 'danger' | 'warning' | 'success';

  constructor() {
  }

  ngOnInit(): void {
    if (this.user.ban) {
      this.userState = 'danger';
      return;
    }

    if (!this.user.isEmailVerify) {
      this.userState = 'warning';
      return;
    }

    this.userState = 'success';
  }
}
