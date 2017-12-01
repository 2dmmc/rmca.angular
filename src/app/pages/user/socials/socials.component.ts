import {AfterViewInit, Component} from '@angular/core';
import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

import {Md5} from 'ts-md5/dist/md5';

import {UserModel} from '../user.model';

@Component({
  selector: 'ngx-socials',
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})
export class SocialsComponent implements AfterViewInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {

  }

  user: UserModel;

  ngAfterViewInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getUserProfile()
      .then(userProfile => {
        this.user = userProfile as UserModel;
        this.user['gravatar'] = `//cdn.v2ex.com/gravatar/${Md5.hashStr(this.user.email)}?s=128`;
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
