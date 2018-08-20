import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})

export class NbLogoutComponent implements OnInit {
  notice: {
    type: 'info' | 'success' | 'danger',
    title: string,
    message: string,
  };

  constructor(private router: Router,
              private authService: AuthService) {
    this.sendNotice('info', '请稍候', '登出中...');
  }

  public ngOnInit(): void {
    this.authService.getLoginState()
      .then(userProfile => {
        if (userProfile['impersonate']) {
          this.authService.logoutImpersonate()
            .then(logoutResult => {
              this.sendNotice('success', '退出替身登陆成功', '即将跳转到dashboard');

              setTimeout(() => {
                this.router.navigate(['/pages/dashboard'])
                  .then(navagateState => {
                    window.location.reload();
                  });
              }, 3e3);
            })
            .catch(error => {
              let noticeTitle;

              switch (error.status) {
                case 406 : {
                  noticeTitle = '大兄弟你现在不在替身模式下';

                  setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                  }, 3e3);
                  break;
                }
                default: {
                  noticeTitle = '未知错误, 请联系鹳狸猿';
                }
              }

              this.sendNotice(
                'danger',
                noticeTitle,
                `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
              );
            });
        } else {
          this.authService.logout()
            .then(
              logoutResult => {
                this.sendNotice('success', '登出成功', '即将跳转到dashboard');

                setTimeout(() => {
                  this.router.navigate(['/auth/login']);
                }, 3e3);
              },
            )
            .catch(error => {
              let noticeTitle;

              switch (error.status) {
                case 401 : {
                  noticeTitle = '大兄弟你得先登陆';

                  setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                  }, 3e3);
                  break;
                }
                default: {
                  noticeTitle = '未知错误, 请联系鹳狸猿';
                }
              }

              this.sendNotice(
                'danger',
                noticeTitle,
                `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
              );
            });
        }
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
