import {Component, OnInit} from '@angular/core';

import {ADMIN_MENU_ITEMS, DEVELOPER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';

import {Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {NbMenuService} from '@nebular/theme';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'ngx-rmca-pages',
  template: `
    <toaster-container [toasterconfig]="toasterconfig"></toaster-container>
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent implements OnInit {
  menu = [];

  constructor(private router: Router,
              private authService: AuthService,
              private menuService: NbMenuService) {
  }

  ngOnInit() {
    this.menu = USER_MENU_ITEMS;

    this.authService.checkLoginState()
      .then(
        user => {
          if (user['admin']) {
            this.menuService.addItems(ADMIN_MENU_ITEMS);
          }

          if (user['username'] === 'sdjnmxd' || user['username'] === 'bangbang93') {
            this.menuService.addItems(DEVELOPER_MENU_ITEMS);
          }
        })
      .catch(error => {
        switch (error.status) {
          case 401: {
            this.router.navigate(['/auth/login']);
            break;
          }
          default: {
            document.write('RMCA出了一些问题, 请稍后重试');
          }
        }
      });
  }

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      positionClass: 'toast-bottom-right',
      timeout: 3e3,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'flyRight',
      limit: 0,
    });
}
