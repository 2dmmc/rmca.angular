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
  template: `
    <ngx-auth-block>
      <h2 class="title">RMCA - 登出</h2>
      <div class="alert alert-danger" role="alert"
           *ngIf="hasError()">
        <div><strong>{{error.title}}</strong></div>
        <div>{{error.message}}</div>
      </div>

      <div class="alert alert-success" role="alert"
           *ngIf="hasMessage()">
        <div><strong>{{message.title}}</strong></div>
        <div>{{message.message}}</div>
      </div>

    </ngx-auth-block>
  `,
})
export class NbLogoutComponent implements OnInit {

  constructor(protected router: Router,
              protected service: AuthService) {
  }

  error = {title: '', message: ''};
  message = {title: '', message: ''};

  ngOnInit(): void {
    this.service.logout()
      .subscribe(
        logoutResult => {
          this.message.title = '登出成功';
          this.message.message = '即将跳转到登陆页';

          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3e3);
        },
        error => {
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
              this.error.message = `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`;
          }
        },
      );
  }

  hasError(): boolean {
    return this.error.title.length !== 0 || this.error.message.length !== 0;
  }

  hasMessage(): boolean {
    return this.message.title.length !== 0 || this.message.message.length !== 0;
  }
}
