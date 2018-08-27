import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';

@Component({
  selector: 'ngx-social-gravatar-state',
  styleUrls: ['./social-gravatar-state.component.scss'],
  templateUrl: './social-gravatar-state.component.html',
})
export class SocialGravatarStateComponent {
  @Input() user: IUser;

  constructor(private userService: UserService,
              private noticeService: NoticeService,
              private authUtilService: AuthUtilService) {
  }

  public async updateUserAvatar() {
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
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';
      this.noticeService.error('更换头像失败', errorMessage);
    }
  }
}
