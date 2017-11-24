import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements AfterViewInit, OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  user: any;
  profileSubmitted: boolean;
  passwordSubmitted: boolean;

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      newPassword: '',
      newPasswordRep: '',
    };

    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=128`;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`);
      });
  }

  ngAfterViewInit() {
  }

  updateProfile(): void {
    this.profileSubmitted = true;

    this.userService.updateUserProfile(this.user.email)
      .then(updateState => {
        this.noticeService.success('更新成功', '更新个人资料成功');
        this.profileSubmitted = false;
      })
      .catch(error => {
        this.noticeService.error('更新个人资料失败', `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`);
        this.profileSubmitted = false;
      });
  }

  isProfileSubmitted(): boolean {
    return this.profileSubmitted;
  }

  updatePassword(): void {
    this.passwordSubmitted = true;

    this.userService.updateUserPassword(this.user.password, this.user.newPassword)
      .then(updateState => {
        this.passwordSubmitted = false;
        this.noticeService.success('更新成功', '更新密码成功');
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
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`;
          }
        }

        this.noticeService.error('更新密码失败', errorMessage);
      });
  }

  isPasswordSubmitted(): boolean {
    return this.passwordSubmitted;
  }
}
