import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@core/services/notice.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {UserService} from '../../../../@core/data/user.service';

@Component({
  selector: 'ngx-social-gravatar-state',
  styleUrls: ['./social-gravatar-state.component.scss'],
  templateUrl: './social-gravatar-state.component.html',
})
export class SocialGravatarStateComponent {
  @Input() user: IUser;

  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  public async updateUserAvatar() {
    try {
      await this.userService.updateUserAvatar('gravatar');
      this.noticeService.success('更换头像成功', 'RMCA头像已经更换为 Gravatar 头像');
    } catch (error) {
      let errorMessage = '';

      switch (error.status) {
        case 406: {
          errorMessage = '你还未绑定该社交账户';
          break;
        }
        default: {
          errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
        }
      }

      this.noticeService.error('更换头像失败', errorMessage);
    }
  }
}
