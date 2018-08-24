import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';

@Component({
  selector: 'ngx-profile-user-info',
  styleUrls: ['./profile-user-info.component.scss'],
  templateUrl: './profile-user-info.component.html',
})

export class ProfileUserInfoComponent implements OnInit {
  @Input() user: IUser;
  @Output() needGetUserProfile = new EventEmitter();
  public profileForm: FormGroup;
  public submitted: boolean;

  constructor(private router: Router,
              private noticeService: NoticeService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      email: new FormControl(
        this.user.email, [
          Validators.required,
          Validators.email,
        ],
      ),
    });

    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.hash) {
        this.verifyEmail(queryParams.hash);
        this.router.navigate([], {queryParams: {hash: null}, queryParamsHandling: 'merge'});
      }
    });
  }

  public async updateProfile(profileForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.userService.updateUserProfile(profileForm.email);
      this.noticeService.success(
        '更新个人资料成功',
        `更新个人资料成功, 你的邮箱已更换为${profileForm.email}`,
      );
      this.needGetUserProfile.emit();
    } catch (error) {
      this.noticeService.error(
        '更新个人资料失败',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
      console.error(error);
    }

    this.submitted = false;
  }

  public async verifyEmail(hash): Promise<void> {
    try {
      await this.userService.verifyEmail(hash);
      this.noticeService.success(
        '验证邮箱成功',
        '验证邮箱成功',
      );
      this.needGetUserProfile.emit();
    } catch (error) {
      const errorMessageMap = {
        403: '验证码和邮箱不匹配',
        404: '验证码无效或已被使用, 请重新验证邮箱',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系管理员';

      this.noticeService.error('验证邮箱失败', errorMessage);
      console.error(error);
    }
  }

  public async resendVerifyEmail(): Promise<void> {
    try {
      await this.userService.resendVerifyEmail();
      this.noticeService.success('发送验证邮件成功', '重新发送验证邮件成功, 请到邮箱去查看. 如没有收到,请尝试重新发送验证邮件或稍后重试');
    } catch (error) {
      const errorMessageMap = {
        412: '该邮箱已经验证',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系管理员';

      this.noticeService.error('发送验证邮件失败', errorMessage);
      console.error(error);
    }
  }
}
