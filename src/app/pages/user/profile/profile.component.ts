import {Component, OnInit} from '@angular/core';

import {Md5} from 'ts-md5/dist/md5';

import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  user: any;

  ngOnInit() {
    this.user = {
      email: '',
      password: '',
      newPassword: '',
      newPasswordRep: '',
      isEmailVerify: false,
    };

    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
