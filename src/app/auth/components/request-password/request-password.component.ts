import {Component} from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
})

export class NbRequestPasswordComponent {
  user: any;
  error: any;
  message: any;
  submitted: boolean;

  constructor(private authService: AuthService) {
    this.user = {};
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = false;
  }

  public requestPassword(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.authService.requestResetPassword(this.user.email)
      .then(
        requestResult => {
          this.message.title = '发送成功';
          this.message.message = `我们已经发送了一封邮件到你的邮箱里 (${this.user.email}), 请根据邮件内容找回你的密码. 如没有收到,请尝试重新发送邮件或稍后重试`;

          // FIXME 非常简单的倒计时
          setTimeout(() => {
            this.submitted = false;
          }, 60e3);
        },
      )
      .catch(error => {
        this.submitted = false;

        switch (error.status) {
          case 404 : {
            this.error.title = '邮箱不存在';
            break;
          }
          default: {
            this.error.title = '未知错误, 请联系鹳狸猿';
          }
        }

        this.error.message = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
      });
  }

  public hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  public hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
