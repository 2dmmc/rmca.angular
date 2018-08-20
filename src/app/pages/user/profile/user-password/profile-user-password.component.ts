import {Component} from '@angular/core';

import {UserService} from '../../user.service';
import {NoticeService} from '../../../../@core/services/notice.service';

@Component({
  selector: 'ngx-profile-user-password',
  styleUrls: ['./profile-user-password.component.scss'],
  templateUrl: './profile-user-password.component.html',
})

export class ProfileUserPasswordComponent {
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.submitted = false;
  }

  public async updatePassword(passwordForm) {
    this.submitted = true;

    try {
      await this.userService.updateUserPassword(passwordForm.password, passwordForm.newPassword);
      this.submitted = false;
      this.noticeService.success('更新密码成功', '更新密码成功');
    } catch (error) {
      this.submitted = false;

      let errorMessage = '';

      switch (error.status) {
        case 403: {
          errorMessage = '当前密码错误';
          break;
        }
        default: {
          errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
        }
      }

      this.noticeService.error('更新密码失败', errorMessage);
    }
  }
}
