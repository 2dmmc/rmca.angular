import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';
import {UserModel} from '../../@model/user.model';

@Component({
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})

export class SocialsComponent implements OnInit {
  user: UserModel;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {

  }

  public ngOnInit(): void {
    this.getUserProfile();
  }

  public getUserProfile(): void {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile as UserModel;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
