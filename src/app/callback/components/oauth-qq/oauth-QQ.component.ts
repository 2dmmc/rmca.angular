import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CallbackService} from '../../../@core/data/callback.service';
import {CommonUtilService} from '../../../@core/utils/common-util.service';
import {RouteService} from '../../../@core/services/route.service';

import {CallbackNoticeComponent} from '../callback-notice/callback-notice.component';

@Component({
  selector: 'ngx-oauth-qq',
  templateUrl: './oauth-QQ.component.html',
})

export class OauthQQComponent implements OnInit {
  @ViewChild(CallbackNoticeComponent) notice: CallbackNoticeComponent;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private callbackService: CallbackService,
              private commonUtilService: CommonUtilService,
              private routeService: RouteService) {
  }

  public async ngOnInit(): Promise<void> {
    this.notice.show(
      'info',
      '请稍候...',
      '授权中...',
    );

    try {
      const accessToken = await this.routeService.getQuery('accessToken');
      const expiresIn = await this.routeService.getQuery('expiresIn');

      await this.callbackService.oauthQQCallback(accessToken, expiresIn);
      this.notice.show(
        'success',
        '授权成功',
        '即将跳转到社交账户授权',
      );
      await this.commonUtilService.sleep(3e3);
      this.router.navigate(['/pages/user/socials']);
    } catch (error) {
      this.notice.show(
        'danger',
        '授权登录失败',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
      console.error(error);
    }
  }
}
