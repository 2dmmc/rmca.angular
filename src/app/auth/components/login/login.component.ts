import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

import {AuthNoticeComponent} from '../auth-notice/auth-notice.component';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean;
  @ViewChild(AuthNoticeComponent) notice: AuthNoticeComponent;

  constructor(private router: Router,
              private authService: AuthService,
              private authUtilService: AuthUtilService,
              private commonUtilService: CommonUtilService) {
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

      this.notice.show(
        'success',
        '登陆成功',
        `欢迎回来 ${user.username || '用户名获取失败'} (${user.email || '邮箱获取失败'}), 即将跳转到控制台`,
      );
      await this.commonUtilService.sleep(3e3);
      this.router.navigate(['/pages/dashboard']);

    } catch (error) {
      this.submitted = false;

      const errorTitleMap = {
        401: '用户名或密码错误',
      };
      const errorTitle = errorTitleMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.notice.show(
        'danger',
        '' + errorTitle,
        `message: ${error.error.message} | code: ${error.status}`,
      );
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
}
