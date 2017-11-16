/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">RMCA - 找回密码</h2>
      <small class="form-text sub-title">请输入正确的email, 我们将会向你发送一封邮件来协助你找回密码</small>
      <form (ngSubmit)="requestPass()" #form="ngForm">

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
          <label for="input-email" class="sr-only">邮箱</label>
          <input name="email" id="input-email" class="form-control" placeholder="邮箱" autofocus
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

        <button class="btn btn-block btn-hero-success"
                [disabled]="isSubmitted() || !form.form.valid"
                [class.btn-pulse]="isSubmitted()">
          发送邮件
        </button>
      </form>

      <div class="links col-sm-12">
        <small class="form-text">
          已经有账户了? <a routerLink="../login"><strong>登陆</strong></a>
        </small>
        <small class="form-text">
          还没有账户? <a routerLink="../register"><strong>注册</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NbRequestPasswordComponent {
  constructor(protected router: Router,
              protected service: AuthService) {
  }

  user: any = {};
  error = {title: '', message: ''};
  message = {title: '', message: ''};
  submitted = false;

  requestPass(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.service.requestPass(this.user.email)
      .subscribe(
        result => {
          this.message.title = '发送成功';
          this.message.message = `我们已经发送了一封邮件到你的邮箱里 (${this.user.email}), 请根据邮件内容找回你的密码. 如没有收到,请尝试重新发送邮件或稍后重试`;

          // FIXME 非常简单的倒计时
          setTimeout(() => {
            this.submitted = false;
          }, 60e3);
        },
        error => {
          this.submitted = false;

          switch (error.status) {
            case 404 : {
              this.error.title = '邮箱不存在';
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
