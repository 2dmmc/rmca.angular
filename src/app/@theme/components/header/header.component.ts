import {Component, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {IUserExtend} from '../../../@model/common/user/user.interface';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: IUserExtend;

  userMenu = [{
    title: '个人中心',
    link: '/pages/user/profile',
  }, {
    title: '登出',
    link: '/auth/logout',
  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authUtilService: AuthUtilService) {
  }

  ngOnInit() {
    this.user = this.authUtilService.user;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
