import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})

export class NbRegisterComponent {
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

  public register(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.authService.register(this.user.username, this.user.password, this.user.email)
      .then(
        registerResult => {
          this.message.title = '注册成功';
          this.message.message = '欢迎加入炉心, 即将跳转到登录页';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
      )
      .catch(error => {
        this.submitted = false;

        switch (error.status) {
          case 409: {
            this.error.title = '用户已存在';
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
