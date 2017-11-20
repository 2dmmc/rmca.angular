/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NbLogoutComponent implements OnInit {

  constructor(protected router: Router,
              protected authService: AuthService) {
  }

  error = {title: '', message: ''};
  message = {title: '', message: ''};

  ngOnInit(): void {
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

        this.error.message = `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`;
      });
  }

  hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
