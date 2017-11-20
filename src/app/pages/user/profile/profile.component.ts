import {Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  user: any;

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(userProfile => {
        this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=256`;
      });
  }

  updateProfile(email): void {
    this.userService.updateUserProfile(email)
      .subscribe(updateState => {
          // TODO toast
        },
        error => {
          // TODO toast
        });
  }

  updatePassword(password, newPassword): void {
    this.userService.updateUserPassword(password, newPassword)
      .subscribe(updateState => {
          // TODO toast
        },
        error => {
          // TODO toast
        });
  }
}
