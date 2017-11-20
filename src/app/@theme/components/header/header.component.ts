import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../pages/user/user.service';

import {Md5} from 'ts-md5/dist/md5';
import {ToastService} from '../../../@system/toast/toast.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: [
    UserService,
    ToastService,
  ],
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{
    title: '个人资料',
    link: '/pages/user/profile',
  }, {
    title: '登出',
    link: '/auth/logout',
  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
        this.user.picture = `//cdn.v2ex.com/gravatar/${Md5.hashStr(userProfile['email'])}?s=64`;
      })
      .catch(error => {
        this.toastService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.error.code || '未知'}`);
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
