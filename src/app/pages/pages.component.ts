import {Component, OnInit} from '@angular/core';

import {ADMIN_MENU_ITEMS, DEVELOPER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';

import {Router} from '@angular/router';
import {AuthService} from '../auth/services/auth.service';
import {NbMenuService} from '@nebular/theme';

@Component({
  selector: 'ngx-rmca-pages',
  template: `
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
      .subscribe(
        user => {
          if (user['admin']) {
            this.menuService.addItems(ADMIN_MENU_ITEMS);
          }

          if (user['username'] === 'sdjnmxd' || user['username'] === 'bangbang93') {
            this.menuService.addItems(DEVELOPER_MENU_ITEMS);
          }
        },
        error => {
          switch (error.status) {
            case 401: {
              this.router.navigate(['/auth/login']);
              break;
            }
            default: {
              alert('RMCA 出现了一些问题');
            }
          }
        });
  }
}
