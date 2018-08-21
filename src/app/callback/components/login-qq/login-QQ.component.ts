import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CallbackService} from '../../../@core/data/callback.service';

@Component({
  selector: 'ngx-login-qq',
  templateUrl: './login-QQ.component.html',
})

export class LoginQQComponent implements OnInit {
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private callbackService: CallbackService) {
    this.sendNotice('info', '请稍后...', '登录中...');
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.callbackService.loginQQCallback(queryParams.accessToken, queryParams.expiresIn)
        .then(success => {
          this.sendNotice('success', '授权登陆成功', '即将跳转到dashboard');
          setTimeout(() => {
            this.router.navigate(['/pages/dashboard']);
          }, 3e3);
        })
        .catch(error => {
          this.sendNotice(
            'danger',
            '授权登陆失败',
            `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
          );
        });
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
