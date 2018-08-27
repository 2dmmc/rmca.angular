import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

@Component({
  selector: 'ngx-profile-user-state',
  styleUrls: ['./profile-user-state.component.scss'],
  templateUrl: './profile-user-state.component.html',
})

export class ProfileUserStateComponent implements OnInit {
  @Input() user: IUser;
  public userState: 'danger' | 'warning' | 'success';
  public updating: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private noticeService: NoticeService,
              private userService: UserService,
              private commonUtilService: CommonUtilService) {
    this.updating = false;
  }

  public async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe(async (queryParams) => {
      if (queryParams.hash) {
        await this.verifyEmail(queryParams.hash);
        this.router.navigate([], {queryParams: {hash: null}, queryParamsHandling: 'merge'});
      }
    });

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

    await this.commonUtilService.sleep(0.7e3);
    this.updating = false;
  }
}
