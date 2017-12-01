import {Component, Input} from '@angular/core';

import {UserModel} from '../../user.model';

import {UserService} from '../../user.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-social-weibo-state',
  styleUrls: ['./social-weibo-state.component.scss'],
  templateUrl: './social-weibo-state.component.html',
})
export class SocialWeiboStateComponent {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  @Input() user: UserModel;

  oAuth(): void {
    window.location.href = `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/oauth/weibo`;
  }

  updateUserAvatar(): void {
    this.userService.updateUserAvatar('weibo')
      .then(updateState => {
        this.noticeService.success('更换头像成功', 'RMCA头像已经更换为 新浪微博 头像');
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
