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
  menu: any;

  constructor(private router: Router,
              private authUtilService: AuthUtilService,
              private menuService: NbMenuService) {
  }

  ngOnInit() {
    let menu = [];

    menu.push.apply(menu, USER_MENU_ITEMS);

    if (this.authUtilService.isAdmin()) {
      menu.push.apply(menu, ADMIN_MENU_ITEMS);
    }

    if (this.authUtilService.isDeveloper()) {
      menu.push.apply(menu, DEVELOPER_MENU_ITEMS);
    }

    this.menu = menu;
  }
}
