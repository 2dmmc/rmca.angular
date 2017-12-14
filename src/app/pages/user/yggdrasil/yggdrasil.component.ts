import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';
import {EmptyUser, UserModel} from '../../@model/user.model';

@Component({
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {
  user: UserModel;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.user = EmptyUser;
  }

  ngOnInit() {
    this.getYggdrasilInfo();
  }

  getYggdrasilInfo(): void {
    this.userService.getUserProfile()
      .then(user => {
        this.user = user as UserModel;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
