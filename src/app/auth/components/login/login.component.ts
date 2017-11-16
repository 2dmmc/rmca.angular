/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'ngx-login',
  template: `
    <ngx-auth-block>
      <h2 class="title">RMCA - 登陆</h2>
      <small class="form-text sub-title">请输入你的用户名和密码来登陆</small>

      <form (ngSubmit)="login()" #form="ngForm" autocomplete=off>
        <div class="alert alert-danger" role="alert"
             *ngIf="hasError()">
          <div><strong>{{error.title}}</strong></div>
          <div>{{error.message}}</div>
        </div>

        <div class="alert alert-success" role="alert"
             *ngIf="hasMessage() && isSubmitted()">
          <div><strong>{{message.title}}</strong></div>
          <div>{{message.message}}</div>
        </div>

        <div class="form-group">
          <label for="input-username" class="sr-only">Username</label>
          <input name="username" id="input-username" class="form-control" placeholder="用户名" autofocus
                 [(ngModel)]="user.username" #username="ngModel"
                 [class.form-control-danger]="username.invalid && username.touched"
                 [required]="true" pattern="^[_a-zA-Z0-9]{6,16}$">
          <small class="form-text error"
                 *ngIf="username.invalid && username.touched && username.errors?.required">
            请填写用户名
          </small>
          <small class="form-text error"
                 *ngIf="username.invalid && username.touched && username.errors?.pattern">
            用户名格式不正确
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">Password</label>
          <input name="password" type="password" id="input-password" class="form-control" placeholder="密码"
                 [(ngModel)]="user.password" #password="ngModel"
                 [class.form-control-danger]="password.invalid && password.touched"
                 [required]="true" [minlength]='6' [maxlength]='32'>
          <small class="form-text error"
                 *ngIf="password.invalid && password.touched && password.errors?.required">
            请填写密码
          </small>
          <small class="form-text error"
                 *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            密码应该在 6 - 32 位之间
          </small>
        </div>

        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="rememberMe">保持登陆状态(没实现)</nb-checkbox>
          <a class="forgot-password" routerLink="../request-password">忘记密码</a>
        </div>

        <button class="btn btn-block btn-hero-success"
                [disabled]="isSubmitted() || !form.valid">
          登陆
        </button>
      </form>

      <div class="links">
        <small class="form-text">使用第三方账号登陆:</small>

        <div class="socials">
          <a href="https://qq.com" target="_blank" class="fa fa-qq"></a>
          <a href="https://wechat.com" target="_blank" class="fa fa-weixin"></a>
          <a href="https://weibo.com" target="_blank" class="fa fa-weibo"></a>
        </div>

        <small class="form-text">
          还没有账户? 去 <a routerLink="../register"><strong>注册</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NbLoginComponent {
  constructor(protected router: Router,
              protected service: AuthService) {
  }

  user: any = {};
  error = {title: '', message: ''};
  message = {title: '', message: ''};
  submitted = false;

  login(): void {
    this.error = this.message = {title: '', message: ''};
    this.submitted = true;

    this.service.login(this.user.username, this.user.password)
      .subscribe(
        result => {
          this.submitted = false;

          console.info(result);
        },
        error => {
          this.submitted = false;

          switch (error.status) {
            case 401 : {
              this.error.title = '用户名或密码错误';
              break;
            }
            default: {
              this.error.title = '未知错误, 请联系鹳狸猿';
            }

            this.error.message = `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`;
          }
        },
      );
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
