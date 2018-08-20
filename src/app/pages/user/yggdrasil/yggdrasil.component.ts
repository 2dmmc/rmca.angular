import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {UserService} from '../user.service';

import {IUser} from '../../../@model/user/user.interface';
import {DefaultUser} from '../../../@model/user/user.const';

@Component({
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {
  user: IUser;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.user = DefaultUser;
  }

  ngOnInit() {
    // this.user = this.userCacheService.getCache();
  }

  public async getUserProfile(): Promise<void> {
    try {
      const user = await this.userService.getUserProfile();

      // this.userCacheService.setCache(user as IUser);
      this.user = user as IUser;
    } catch (error) {
      this.noticeService.error(
        '获取用户信息失败, 请刷新页面重试',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
    }
  }
}
