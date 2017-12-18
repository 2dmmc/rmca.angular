import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';
import {User} from '../../../@model/user/user.interface';
import {DefaultUser} from '../../../@model/user/user.const';

@Component({
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {
  user: User;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.user = DefaultUser;
  }

  ngOnInit() {
    this.getYggdrasilInfo();
  }

  getYggdrasilInfo(): void {
    this.userService.getUserProfile()
      .then(user => {
        this.user = user as User;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
