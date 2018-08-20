import {Component, OnInit} from '@angular/core';

import {ADMIN_MENU_ITEMS, DEVELOPER_MENU_ITEMS, USER_MENU_ITEMS} from './pages-menu';

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
  menu: any;

  constructor() {
  }

  ngOnInit() {
    const menu = [];

    menu.push.apply(menu, USER_MENU_ITEMS);

    if (1 === 1) {
      menu.push.apply(menu, ADMIN_MENU_ITEMS);
    }

    if (1 === 1) {
      menu.push.apply(menu, DEVELOPER_MENU_ITEMS);
    }

    this.menu = menu;
  }

}
