import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CallbackService} from '../../services/callback.service';

@Component({
  selector: 'ngx-oauth-weibo',
  templateUrl: './oauth-weibo.component.html',
})

export class OauthWeiboComponent implements OnInit {
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private callbackService: CallbackService) {
    this.sendNotice('info', '请稍后...', '授权中...');
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.callbackService.oauthWeiboCallback(queryParams.accessToken, queryParams.expiresIn)
        .then(success => {
          this.sendNotice('success', '授权成功', '即将跳转到dashboard');
          setTimeout(() => {
            this.router.navigate(['/pages/user/socials']);
          }, 3e3);
        })
        .catch(error => {
          this.sendNotice('danger', '授权失败', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
        });
    });
  }

  private sendNotice(type: 'info' | 'success' | 'danger', title: string, message: string) {
    this.notice = {
      type: type,
      title: title,
      message: message,
    };
  }
}
