import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

@Component({
  selector: 'ngx-social-weibo-state',
  styleUrls: ['./social-weibo-state.component.scss'],
  templateUrl: './social-weibo-state.component.html',
})
export class SocialWeiboStateComponent {
  @Input() user: IUser;
  public updating: boolean;

  constructor(private userService: UserService,
              private noticeService: NoticeService,
              private authUtilService: AuthUtilService,
              private commonUtilService: CommonUtilService) {
    this.updating = false;
  }

  public oAuth(): void {
    this.updating = true;
    window.location.href =
      `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/oauth/weibo`;
  }

  public async updateUserAvatar() {
    this.updating = true;

    try {
      await this.userService.updateUserAvatar('weibo');
      this.noticeService.success(
        '更换头像成功',
        'RMCA头像已经更换为 新浪微博 头像',
      );
      this.authUtilService.updateUser();
    } catch (error) {
      const errorMessageMap = {
        406: '你还未绑定该社交账户',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';
      this.noticeService.error('更换头像失败', errorMessage);
    }

    await this.commonUtilService.sleep(0.7e3);
    this.updating = false;
  }
}
