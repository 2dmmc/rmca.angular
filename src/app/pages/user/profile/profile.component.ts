import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {IUser} from '../../../@model/common/user/user.interface';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';


@Component({
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: IUser;

  constructor(private noticeService: NoticeService,
              private authUtilService: AuthUtilService) {
  }

  public ngOnInit(): void {
    this.user = this.authUtilService.user;
  }

  public async getUserProfile(): Promise<void> {
    try {
      this.user = await this.authUtilService.updateUser();
    } catch (error) {
      this.noticeService.error(
        '获取用户信息失败, 请刷新页面重试',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
    }
  }
}
