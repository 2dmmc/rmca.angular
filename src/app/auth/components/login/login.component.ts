import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NbLoginComponent {
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

  public login(): void {
    this.submitted = true;

    this.authService.login(this.user.username, this.user.password, this.user.isKeepLogin)
      .then(
        user => {
          this.sendNotice('success', '登陆成功', `欢迎回来 ${user['username'] || '用户名获取失败'} (${user['email'] || '邮箱获取失败'}), 即将跳转到控制台`);
          setTimeout(() => {
            this.router.navigate(['/pages/dashboard']);
          }, 3e3);
        },
      )
      .catch(error => {
        this.submitted = false;
        let errorTitle;

        switch (error.status) {
          case 401 : {
            errorTitle = '用户名或密码错误';
            break;
          }
          default: {
            errorTitle = '未知错误, 请联系鹳狸猿';
          }
        }

        this.sendNotice('danger', errorTitle, `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public qqLogin(): void {
    window.location.href = `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/login/qq`;
  }

  public weiboLogin(): void {
    window.location.href = `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/login/weibo`;
  }

  private sendNotice(type: 'info' | 'success' | 'danger', title: string, message: string): void {
    this.notice = {
      type: type,
      title: title,
      message: message,
    };
  }
}
