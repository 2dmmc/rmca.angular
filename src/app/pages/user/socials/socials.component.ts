import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {UserService} from '../user.service';

import {IUser} from '../../../@model/common/user/user.interface';
import {DefaultUser} from '../../../@model/common/user/user.const';

@Component({
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})

export class SocialsComponent implements OnInit {
  user: IUser;

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
