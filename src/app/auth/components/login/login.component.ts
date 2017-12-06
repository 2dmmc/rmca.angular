import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NbLoginComponent {
  user: any;
  error: any;
  message: any;
  submitted: boolean;

  constructor(private router: Router,
              private authService: AuthService) {
    this.user = {};
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = false;
  }

  public login(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.authService.login(this.user.username, this.user.password, this.user.isKeepLogin)
      .then(
        user => {
          this.message.title = '登陆成功';
          this.message.message = `欢迎回来 ${user['username'] || '用户名获取失败'} (${user['email'] || '邮箱获取失败'}), 即将跳转到控制台`;

          setTimeout(() => {
            this.router.navigate(['/pages/dashboard']);
          }, 3e3);
        },
      )
      .catch(error => {
        this.submitted = false;

        switch (error.status) {
          case 401 : {
            this.error.title = '用户名或密码错误';
            break;
          }
          default: {
            this.error.title = '未知错误, 请联系鹳狸猿';
          }
            this.error.message = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
        }
      });
  }

  public qqLogin(): void {
    window.location.href = `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/login/qq`;
  }

  public weiboLogin(): void {
    window.location.href = `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/login/weibo`;
  }

  public hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  public hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
