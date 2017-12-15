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
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };
  submitted: boolean;
  hash: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.user = {};
    this.submitted = false;
    this.hash = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hash = queryParams.hash;
    });
  }

  public resetPassword(): void {
    this.submitted = true;

    this.authService.resetPassword(this.hash, this.user.password)
      .then(
        resetResult => {
          this.sendNotice('success', '重置成功', '请使用你的新密码登陆, 即将跳转到登陆页');

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
      )
      .catch(error => {
        let errorTitle;
        this.submitted = false;

        switch (error.status) {
          case 403 : {
            errorTitle = '令牌无效或已被使用, 请重新找回密码';
            break;
          }
          default: {
            errorTitle = '未知错误, 请联系鹳狸猿';
          }
        }

        this.sendNotice('danger', errorTitle, `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  private sendNotice(type: 'info' | 'success' | 'danger', title: string, message: string): void {
    this.notice = {
      type: type,
      title: title,
      message: message,
    };
  }
}
