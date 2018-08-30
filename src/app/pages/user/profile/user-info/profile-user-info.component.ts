import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {IUserExtendProfile, ProfileComponent} from '../profile.component';
import {UserState} from '../../../../@model/common/user/user.interface';

import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {UserService} from '../../../../@core/data/user.service';

@Component({
  selector: 'ngx-profile-user-info',
  styleUrls: ['./profile-user-info.component.scss'],
  templateUrl: './profile-user-info.component.html',
})

export class ProfileUserInfoComponent implements OnInit {
  @Input() user: IUserExtendProfile;
  public UserStateEnum = UserState;

  public updating: boolean;
  public submitted: boolean;
  public flaped: boolean;

  public profileForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private noticeService: NoticeService,
              private userService: UserService,
              private commonUtilService: CommonUtilService,
              public authUtilService: AuthUtilService,
              @Inject(forwardRef(() => ProfileComponent)) private _parent: ProfileComponent) {
    this.updating = false;
    this.submitted = false;
    this.flaped = false;
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (queryParams) => {
      if (queryParams.hash) {
        await this.verifyEmail(queryParams.hash);
        this.router.navigate([], {queryParams: {hash: null}, queryParamsHandling: 'merge'});
      }
    });

    this.profileForm = new FormGroup({
      email: new FormControl(
        this.user.email, [
          Validators.required,
          Validators.email,
        ],
      ),
    });
  }

  public flipCard(): void {
    this.flaped = !this.flaped;
  }

  public async resendVerifyEmail(): Promise<void> {
    this.updating = true;

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

    await this.commonUtilService.sleep(0.7e3);
    this.updating = false;
  }

  private async verifyEmail(hash): Promise<void> {
    this.updating = true;

    try {
      await this.userService.verifyEmail(hash);
      this.noticeService.success(
        '验证邮箱成功',
        '验证邮箱成功',
      );
    } catch (error) {
      const errorMessageMap = {
        403: '验证码和邮箱不匹配',
        404: '验证码无效或已被使用, 请重新验证邮箱',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系管理员';

      this.noticeService.error('验证邮箱失败', errorMessage);
      console.error(error);
    }

    await this.updateUserProfile();
  }

  public async updateProfile(profileForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.userService.updateUserProfile(profileForm.email);
      this.noticeService.success(
        '更新个人资料成功',
        `更新个人资料成功, 你的邮箱已更换为${profileForm.email}`,
      );
    } catch (error) {
      this.noticeService.error('更新个人资料失败', '更新个人资料失败, 请刷新页面重试');
      console.error(error);
    }

    await this.commonUtilService.sleep(0.7e3);
    this.submitted = false;
    this.flipCard();

    await this.updateUserProfile();
  }

  // FIXME 整体逻辑需优化, 太冗余
  public async updateUserProfile() {
    this.updating = true;

    await this._parent.updateUserProfile();

    await this.commonUtilService.sleep(0.7e3);
    this.updating = false;
  }
}
