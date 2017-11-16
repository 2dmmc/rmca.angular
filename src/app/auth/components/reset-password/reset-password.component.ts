/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">RMCA - 密码重置</h2>
      <small class="form-text sub-title">请输入您的新密码来重置现有密码</small>
      <form (ngSubmit)="resetPassword()" #form="ngForm">

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
          <label for="input-password" class="sr-only">密码</label>
          <input name="password" type="password" id="input-password" class="form-control" placeholder="密码" autofocus
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

        <button class="btn btn-hero-success btn-block"
                [disabled]="isSubmitted() || !form.form.valid || password.value != rePass.value"
                [class.btn-pulse]="isSubmitted()">
          修改密码
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
export class NbResetPasswordComponent {
  user: any = {};
  error = {title: '', message: ''};
  message = {title: '', message: ''};
  submitted = false;
  hash = '';

  constructor(protected router: Router,
              protected activatedRoute: ActivatedRoute,
              protected service: AuthService) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hash = queryParams.hash;
    });

    this.service.checkHash(this.hash)
      .subscribe(
        result => {
        },
        error => {
          this.submitted = false;

          switch (error.status) {
            case 403: {
              this.error.title = '令牌无效或已被使用, 请重新找回密码';
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

  resetPassword(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;


    this.service.resetPassword(this.hash, this.user.password)
      .subscribe(
        result => {
          this.message.title = '重置成功';
          this.message.message = '请使用你的新密码登陆, 即将跳转到登陆页';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
        error => {
          console.error(error);

          this.submitted = false;

          switch (error.status) {
            case 403: {
              this.error.title = '令牌无效或已被使用, 请重新找回密码';
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
