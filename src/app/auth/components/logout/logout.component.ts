import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

import {AuthNoticeComponent} from '../auth-notice/auth-notice.component';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})

export class LogoutComponent implements OnInit {
  @ViewChild(AuthNoticeComponent) notice: AuthNoticeComponent;

  constructor(private router: Router,
              private authService: AuthService,
              private commonUtilService: CommonUtilService) {
  }

  async ngOnInit(): Promise<void> {
    this.notice.show(
      'info',
      '请稍候',
      '登出中...',
    );

    try {
      const loginState = await this.authService.getLoginState();

      if (loginState.impersonate) {
        await this.authService.logoutImpersonate();
        this.notice.show(
          'success',
          '退出替身登录成功',
          '即将跳转到dashboard',
        );
        await this.commonUtilService.sleep(3e3);
        await this.router.navigate(['/pages/dashboard']);
        window.location.reload();
      } else {
        await this.authService.logout();
        this.notice.show(
          'success',
          '登出成功',
          '即将跳转到登录页',
        );
        await this.commonUtilService.sleep(3e3);
        this.router.navigate(['/auth/login']);
      }
    } catch (error) {
      const errorMessageMap = {
        401: '大兄弟你得先登录',
        406: '大兄弟你现在不在替身模式下',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.notice.show(
        'danger',
        '' + errorMessage,
        `message: ${error.error.message} | code: ${error.status}`,
      );
      console.error(error);

      await this.commonUtilService.sleep(3e3);
      this.router.navigate(['/auth/login']);
    }
  }
}
