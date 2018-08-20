import {Component} from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
})

export class NbRequestPasswordComponent {
  user: any;
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };
  submitted: boolean;

  constructor(private authService: AuthService) {
    this.user = {};
    this.submitted = false;
  }

  public requestPassword(): void {
    this.submitted = true;

    this.authService.requestResetPassword(this.user.email)
      .then(
        requestResult => {
          this.sendNotice(
            'success',
            '发送成功',
            `我们已经发送了一封邮件到你的邮箱里 (${this.user.email}), 请根据邮件内容找回你的密码. 如没有收到,请尝试重新发送邮件或稍后重试`,
          );

          // TODO 非常简单的倒计时
          setTimeout(() => {
            this.submitted = false;
          }, 60e3);
        },
      )
      .catch(error => {
        let errorTitle;
        this.submitted = false;

        switch (error.status) {
          case 404 : {
            errorTitle = '邮箱不存在';
            break;
          }
          default: {
            errorTitle = '未知错误, 请联系鹳狸猿';
          }
        }

        this.sendNotice(
          'danger',
          errorTitle,
          `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
        );
      });
  }

  private sendNotice(type: 'info' | 'success' | 'danger', title: string, message: string): void {
    this.notice = {
      type: type,
      title: title,
      message: message,
    };
  }
}
