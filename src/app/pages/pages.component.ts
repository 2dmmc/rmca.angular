import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbMenuService} from '@nebular/theme';

import {ADMIN_MENU_ITEMS, DEVELOPER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';

import {AuthUtilService} from '../auth/services/auth-util.service';

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
              private authUtilService: AuthUtilService,
              private menuService: NbMenuService) {
  }

  ngOnInit() {
    this.menu = USER_MENU_ITEMS;

    this.authUtilService.isAdmin()
      .then(isAdmin => {
        if (isAdmin) {
          this.menuService.addItems(ADMIN_MENU_ITEMS);
        }
      })
      .catch(error => {

      });

    this.authUtilService.isDeveloper()
      .then(isDeveloper => {
        if (isDeveloper) {
          this.menuService.addItems(DEVELOPER_MENU_ITEMS);
        }
      })
      .catch(error => {

      });
  }
}
