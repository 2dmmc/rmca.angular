import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

@Component({
  selector: 'ngx-social-gravatar-state',
  styleUrls: ['./social-gravatar-state.component.scss'],
  templateUrl: './social-gravatar-state.component.html',
})
export class SocialGravatarStateComponent {
  @Input() user: IUser;
  public updating: boolean;

  constructor(private userService: UserService,
              private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              private authUtilService: AuthUtilService) {
    this.updating = false;
  }

  public async updateUserAvatar() {
    this.updating = true;

    try {
      await this.userService.updateUserAvatar('gravatar');
      this.noticeService.success(
        '更换头像成功',
        'RMCA头像已经更换为 Gravatar 头像',
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
