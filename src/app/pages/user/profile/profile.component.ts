import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  user: any;
  passwordSubmitted: boolean;

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      newPassword: '',
      newPasswordRep: '',
      isEmailVerify: false,
    };

    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=128`;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  updatePassword(): void {
    this.passwordSubmitted = true;

    this.userService.updateUserPassword(this.user.password, this.user.newPassword)
      .then(updateState => {
        this.passwordSubmitted = false;
        this.noticeService.success('更新密码成功', '更新密码成功');
      })
      .catch(error => {
        this.passwordSubmitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 403: {
            errorMessage = '当前密码错误';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('更新密码失败', errorMessage);
      });
  }

  isPasswordSubmitted(): boolean {
    return this.passwordSubmitted;
  }
}
