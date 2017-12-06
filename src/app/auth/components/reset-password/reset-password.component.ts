import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
})

export class NbResetPasswordComponent implements OnInit {
  user: any;
  error: any;
  message: any;
  submitted: boolean;
  hash: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.user = {};
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = false;
    this.hash = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hash = queryParams.hash;
    });
  }

  public resetPassword(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
    this.submitted = true;

    this.authService.resetPassword(this.hash, this.user.password)
      .then(
        resetResult => {
          this.message.title = '重置成功';
          this.message.message = '请使用你的新密码登陆, 即将跳转到登陆页';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
      )
      .catch(error => {
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
