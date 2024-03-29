import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

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
              private noticeUtilService: NoticeUtilService,
              private authUtilService: AuthUtilService) {
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
      this.noticeUtilService.errorNotice(error, '更换头像失败', errorMessageMap);
    }

    this.updating = false;
  }
}
