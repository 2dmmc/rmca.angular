import {Component, OnInit} from '@angular/core';

import {UserService} from '../../user.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-password-manager',
  styleUrls: ['./user-password-manager.component.scss'],
  templateUrl: './user-password-manager.component.html',
})

export class UserPasswordManagerComponent implements OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  user: any;
  submitted: boolean;

  ngOnInit(): void {
    this.user = {
      password: '',
      newPassword: '',
      confirmPassword: '',
    };

    this.submitted = false;
  }

  updatePassword(): void {
    this.submitted = true;

    this.userService.updateUserPassword(this.user.password, this.user.newPassword)
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
