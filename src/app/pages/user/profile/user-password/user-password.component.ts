import {Component} from '@angular/core';

import {UserService} from '../../user.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-password',
  styleUrls: ['./user-password.component.scss'],
  templateUrl: './user-password.component.html',
})

export class UserPasswordComponent {
  form: any;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.form = {
      password: '',
      newPassword: '',
      confirmPassword: '',
    };
    this.submitted = false;
  }

  public updatePassword(): void {
    this.submitted = true;

    this.userService.updateUserPassword(this.form.password, this.form.newPassword)
      .then(updateState => {
        this.submitted = false;
        this.noticeService.success('更新密码成功', '更新密码成功');
      })
      .catch(error => {
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
      });
  }
}
