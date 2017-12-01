import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../pages/user/user.service';

import {Md5} from 'ts-md5/dist/md5';
import {NoticeService} from '../../../@system/notice/notice.service';

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

  user: any;

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
  }

  ngOnInit() {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
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
