import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class NbLoginComponent implements OnInit {
  loginForm: FormGroup;

  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private authUtilService: AuthUtilService) {
    this.submitted = false;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get isKeepLogin() {
    return this.loginForm.get('isKeepLogin');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(/^[_a-zA-Z0-9]{6,16}$/),
        ],
      ),
      password: new FormControl(
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ),
      isKeepLogin: new FormControl(false),
    });
  }

  public async login(): Promise<void> {
    this.submitted = true;

    try {
      const user = await this.authService.login(this.username.value, this.password.value, this.isKeepLogin.value);
      this.authUtilService.user = user;

      this.sendNotice(
        'success',
        '登陆成功',
        `欢迎回来 ${user.username || '用户名获取失败'} (${user.email || '邮箱获取失败'}), 即将跳转到控制台`,
      );
      // setTimeout(() => {
      //   return this.router.navigate(['/pages/dashboard']);
      // }, 3e3);
    } catch (error) {
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

      this.sendNotice('danger',
        errorTitle,
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
    }
  }

  public qqLogin(): void {
    window.location.href =
      `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/login/qq`;
  }

  public weiboLogin(): void {
    window.location.href =
      `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/login/weibo`;
  }

  private sendNotice(type: 'info' | 'success' | 'danger', title: string, message: string): void {
    this.notice = {
      type: type,
      title: title,
      message: message,
    };
  }
}
