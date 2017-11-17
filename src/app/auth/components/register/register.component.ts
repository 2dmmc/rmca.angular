/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">RMCA - 注册</h2>
      <small class="form-text sub-title">Do u like RGB ?</small>

      <form (ngSubmit)="register()" #form="ngForm" autocomplete=off>
        <div class="alert alert-danger" role="alert"
             *ngIf="hasError()">
          <div><strong>{{error.title}}</strong></div>
          <div>{{error.message}}</div>
        </div>

        <div class="alert alert-success" role="alert"
             *ngIf="hasMessage()">
          <div><strong>{{message.title}}</strong></div>
          <div>{{message.message}}</div>
        </div>

        <div class="form-group">
          <label for="input-username" class="sr-only">用户名</label>
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
          <label for="input-email" class="sr-only">邮箱</label>
          <input name="email" id="input-email" class="form-control" placeholder="邮箱"
                 [(ngModel)]="user.email" #email="ngModel"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="true" pattern=".+@.+..+">
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.required">
            请填写邮箱
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            邮箱格式不正确
          </small>
        </div>

        <div class="form-group">
          <label for="input-password" class="sr-only">密码</label>
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

        <div class="form-group">
          <label for="input-re-password" class="sr-only">重复密码</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
            class="form-control" placeholder="重复密码" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || password.value != rePass.value) && rePass.touched"
            [required]="true">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            请输入重复密码
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            两次密码不匹配
          </small>
        </div>

        <div class="form-group accept-group col-sm-12">
          <nb-checkbox name="terms">
            阅读并接受 <a href="javascript:(alert('你是我见过的真正读协议的人|･ω･｀)'));" target="_blank"><strong>用户协议</strong></a>
          </nb-checkbox>
        </div>

        <button class="btn btn-block btn-hero-success"
                [disabled]="isSubmitted() || !form.form.valid || password.value != rePass.value"
                [class.btn-pulse]="isSubmitted()">
          注册
        </button>
      </form>

      <div class="links">
        <small class="form-text">
          已经有账户了? <a routerLink="../login"><strong>登陆</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NbRegisterComponent {
  constructor(protected router: Router,
              protected authService: AuthService) {
  }

  user: any = {};
  error = {title: '', message: ''};
  message = {title: '', message: ''};
  submitted = false;

  register(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.authService.register(this.user.username, this.user.password, this.user.email)
      .subscribe(
        result => {
          this.message.title = '注册成功';
          this.message.message = '欢迎加入炉心, 即将跳转到登录页';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
        error => {
          console.error(error);

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

          this.error.message = `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`;
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
