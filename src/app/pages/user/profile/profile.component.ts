import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';

import {User} from '../../../@model/user/user.interface';
import {DefaultUser} from '../../../@model/user/user.const';
import {UserCacheService} from '../../../@system/cache/service/user-cache.service';


@Component({
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private noticeService: NoticeService,
              private userService: UserService,
              private userCacheService: UserCacheService) {
    this.user = DefaultUser;
  }

  public ngOnInit(): void {
    this.user = this.userCacheService.getCache();
  }

  public async getUserProfile() {
    try {
      const user = await this.userService.getUserProfile();

      this.userCacheService.setCache(user as User);
      this.user = user as User;
    } catch (error) {
      this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
    }
  }
}
