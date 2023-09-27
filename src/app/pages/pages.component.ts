import {Component, OnInit} from '@angular/core';

import {ADMIN_MENU_ITEMS, DEVELOPER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';

import {AuthUtilService} from '../@core/utils/auth-util.service';
import {IUserExtend} from '../@model/common/user/user.interface';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-rmca-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-rmca-layout>
  `,
})
export class PagesComponent implements OnInit {
  public user: IUserExtend;
  public menu: any;

  constructor(private authUtilService: AuthUtilService) {
  }

  ngOnInit() {
    const menu = [];

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
