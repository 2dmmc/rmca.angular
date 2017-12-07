import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {UserModel} from '../../../@model/user.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'ngx-social-gravatar-state',
  styleUrls: ['./social-gravatar-state.component.scss'],
  templateUrl: './social-gravatar-state.component.html',
})
export class SocialGravatarStateComponent {
  @Input() user: UserModel;

  constructor(private router: Router,
              private userService: UserService,
              private noticeService: NoticeService) {
  }

  public goToProfile(): void {
    this.router.navigate(['./profile']);
  }

  public updateUserAvatar(): void {
    this.userService.updateUserAvatar('gravatar')
      .then(updateState => {
        this.noticeService.success('更换头像成功', 'RMCA头像已经更换为 Gravatar 头像');
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
