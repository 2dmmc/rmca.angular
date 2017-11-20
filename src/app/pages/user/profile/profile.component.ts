import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';
import {ToastService} from '../../../@system/toast/toast.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements AfterViewInit, OnInit {
  constructor(private userService: UserService,
              private toastService: ToastService) {
  }

  // user: any;
  user = {
    username: 'sdjnmxd',
    email: 'i@mxd.moe',
    admin: true,
    picture: '',
  };

  profileSubmitted: boolean;

  ngOnInit() {
    this.userService.getUserProfile()
      .then(userProfile => {
        // this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=128`;
      })
      .catch(error => {
        this.toastService.error('获取用户信息失败', error.error.message);
      });
  }

  ngAfterViewInit() {
  }

  updateProfile(): void {
    this.profileSubmitted = true;

    this.userService.updateUserProfile(this.user.email)
      .then(updateState => {
        this.toastService.success('更新成功', '更新个人资料成功');

        // TODO toast
        this.profileSubmitted = false;
      })
      .catch(error => {
        this.toastService.error('更新个人资料失败', error.error.message);

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
