import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})

export class NbLogoutComponent implements OnInit {
  error: any;
  message: any;

  constructor(private router: Router,
              private authService: AuthService) {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};
  }

  public ngOnInit(): void {
    this.error = {title: '', message: ''};
    this.message = {title: '', message: ''};

    this.authService.getLoginState()
      .then(userProfile => {
        if (userProfile['impersonate']) {
          this.authService.logoutImpersonate()
            .then(logoutResult => {
              this.message.title = '退出替身登陆成功';
              this.message.message = '即将跳转到dashboard';

              setTimeout(() => {
                this.router.navigate(['/pages/dashboard']);
                window.location.reload();
              }, 3e3);
            })
            .catch(error => {
              switch (error.status) {
                case 406 : {
                  this.error.title = '大兄弟你现在不在替身模式下';
                  this.error.message = '即将跳转到登陆页';

                  setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                  }, 3e3);
                  break;
                }
                default: {
                  this.error.title = '未知错误, 请联系鹳狸猿';
                }
              }

              this.error.message = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
            });
        } else {
          this.authService.logout()
            .then(
              logoutResult => {
                this.message.title = '登出成功';
                this.message.message = '即将跳转到登陆页';

                setTimeout(() => {
                  this.router.navigate(['/auth/login']);
                }, 3e3);
              },
            )
            .catch(error => {
              switch (error.status) {
                case 401 : {
                  this.error.title = '大兄弟你得先登陆';
                  this.error.message = '即将跳转到登陆页';

                  setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                  }, 3e3);
                  break;
                }
                default: {
                  this.error.title = '未知错误, 请联系鹳狸猿';
                }
              }

              this.error.message = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
            });
        }
      })

    ;
  }

  public hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  public hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
