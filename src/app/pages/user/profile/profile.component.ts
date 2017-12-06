import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: any;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.user = {
      email: '',
      password: '',
      newPassword: '',
      newPasswordRep: '',
      isEmailVerify: false,
    };
  }

  public ngOnInit(): void {
    this.getUserProfile();
  }

  public getUserProfile(): void {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
