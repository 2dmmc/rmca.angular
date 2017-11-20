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
  profileSubmitted: boolean;

  ngOnInit() {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=128`;
      })
      .catch(error => {
        //
      });
  }

  updateProfile(): void {
    this.profileSubmitted = true;

    this.userService.updateUserProfile(this.user.email)
      .then(updateState => {
        // TODO toast
        this.profileSubmitted = false;
      })
      .catch(error => {
        // TODO toast
        this.profileSubmitted = false;
      });
  }

  isProfileSubmitted(): boolean {
    return this.profileSubmitted;
  }

  updatePassword(password, newPassword): void {
    this.userService.updateUserPassword(password, newPassword)
      .then(updateState => {
        // TODO toast
      })
      .catch(error => {
        // TODO toast
      });
  }
}
