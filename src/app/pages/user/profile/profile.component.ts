import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  constructor(protected activatedRoute: ActivatedRoute,
              private userService: UserService,
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
      isEmailVerify: false,
    };

    this.getUserProfile();

    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.hash) {
        this.verifyEmail(queryParams.hash);
      }
    });
  }

  verifyEmail(hash): void {
    this.userService.verifyEmail(hash)
      .then(updateState => {
        this.noticeService.success('验证邮箱成功', '邮箱验证成功');
        this.getUserProfile();
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 404: {
            errorMessage = '令牌无效或已被使用, 请重新找回密码';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('验证邮箱失败', errorMessage);
      });
  }

  resendVerifyEmail(): void {
    this.userService.resendVerifyEmail()
      .then(resendState => {
        this.noticeService.success('发送验证邮件成功', '重新发送验证邮件成功, 请到邮箱去查看. 如没有收到,请尝试重新发送验证邮件或稍后重试');
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 412: {
            errorMessage = '邮箱已经验证, 请勿重复验证';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('发送验证邮件失败', errorMessage);
      });
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

  updateProfile(): void {
    this.profileSubmitted = true;

    this.userService.updateUserProfile(this.user.email)
      .then(updateState => {
        this.noticeService.success('更新个人资料成功', '更新个人资料成功');
        this.getUserProfile();
        this.profileSubmitted = false;
      })
      .catch(error => {
        this.noticeService.error('更新个人资料失败', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
        this.profileSubmitted = false;
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

  isProfileSubmitted(): boolean {
    return this.profileSubmitted;
  }

  isPasswordSubmitted(): boolean {
    return this.passwordSubmitted;
  }
}
