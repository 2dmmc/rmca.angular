import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})

export class NbRegisterComponent {
  user: any;
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };
  submitted: boolean;

  constructor(private router: Router,
              private authService: AuthService) {
    this.user = {};
    this.submitted = false;
  }

  public register(): void {
    this.submitted = true;

    this.authService.register(this.user.username, this.user.password, this.user.email)
      .then(
        registerResult => {
          this.sendNotice('success', '注册成功', '欢迎加入炉心, 即将跳转到登录页');

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
      )
      .catch(error => {
        let errorTitle;
        this.submitted = false;

        switch (error.status) {
          case 409 : {
            errorTitle = '用户已存在';
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
