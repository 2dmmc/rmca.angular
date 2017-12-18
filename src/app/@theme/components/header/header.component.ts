import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../pages/user/user.service';

import {NoticeService} from '../../../@system/notice/notice.service';

import {User} from '../../../@model/user/user.interface';
import {DefaultUser} from '../../../@model/user/user.const';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [
    UserService,
    NoticeService,
  ],
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: User;

  userMenu = [{
    title: '个人中心',
    link: '/pages/user/profile',
  }, {
    title: '登出',
    link: '/auth/logout',
  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private noticeService: NoticeService) {
    this.user = DefaultUser;
  }

  ngOnInit() {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile as User;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
