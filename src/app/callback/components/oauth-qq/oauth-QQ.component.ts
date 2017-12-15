import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CallbackService} from '../../services/callback.service';

@Component({
  selector: 'ngx-oauth-qq',
  templateUrl: './oauth-QQ.component.html',
})

export class OauthQQComponent implements OnInit {
  error: any;
  message: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private callbackService: CallbackService) {
    this.error = {title: '', message: ''};
    this.message = {title: '请稍候', message: '授权中'};
  }

  public ngOnInit(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};

    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.callbackService.oauthQQCallback(queryParams.accessToken, queryParams.expiresIn)
        .then(success => {
          this.message.title = '授权成功';
          this.message.message = '即将跳转到社交账户管理页';

          setTimeout(() => {
            this.router.navigate(['/pages/user/socials']);
          }, 3e3);
        })
        .catch(error => {
          this.error.title = '授权失败';
          this.error.message = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
        });
    });
  }

  public goToSocials(): void {
    this.router.navigate(['/pages/user/socials']);
  }

  public hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  public hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
