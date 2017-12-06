import {Component, Input} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {UserModel} from '../../user.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'ngx-social-qq-state',
  styleUrls: ['./social-QQ-state.component.scss'],
  templateUrl: './social-QQ-state.component.html',
})
export class SocialQQStateComponent {
  @Input() user: UserModel;

  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  public oAuth(): void {
    window.location.href = `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/oauth/qq`;
  }

  public updateUserAvatar(): void {
    this.userService.updateUserAvatar('qq')
      .then(updateState => {
        this.noticeService.success('更换头像成功', 'RMCA头像已经更换为 腾讯QQ 头像');
      })
      .catch(error => {
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
      });
  }

}
