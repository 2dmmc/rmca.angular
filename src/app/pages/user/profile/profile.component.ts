import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {UserService} from '../user.service';

import {User} from '../../../@model/user/user.interface';
import {DefaultUser} from '../../../@model/user/user.const';


@Component({
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.user = DefaultUser;
  }

  public ngOnInit(): void {
    // this.user = this.userCacheService.getCache();
  }

  public async getUserProfile(): Promise<void> {
    try {
      const user = await this.userService.getUserProfile();

      // this.userCacheService.setCache(user as User);
      this.user = user as User;
    } catch (error) {
      this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
    }
  }
}
