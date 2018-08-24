import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CallbackService} from '../../../@core/data/callback.service';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

import {CallbackNoticeComponent} from '../callback-notice/callback-notice.component';

@Component({
  selector: 'ngx-login-weibo',
  templateUrl: './login-weibo.component.html',
})

export class LoginWeiboComponent implements OnInit {
  @ViewChild(CallbackNoticeComponent) notice: CallbackNoticeComponent;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private callbackService: CallbackService,
              private commonUtilService: CommonUtilService) {
  }

  public ngOnInit(): void {
    this.notice.show(
      'info',
      '请稍候...',
      '登录中...',
    );

    this.activatedRoute.queryParams.subscribe(async (queryParams) => {
      try {
        await this.callbackService.loginWeiboCallback(queryParams.accessToken, queryParams.expiresIn);
        this.notice.show(
          'success',
          '授权登陆成功',
          '即将跳转到dashboard',
        );
        await this.commonUtilService.sleep(3e3);
        this.router.navigate(['/auth/login']);
      } catch (error) {
        this.notice.show(
          'danger',
          '授权登陆失败',
          `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
        );
        console.error(error);
      }
    });
  }
}
