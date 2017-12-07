import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@system/notice/notice.service';

import {UserService} from '../user.service';

@Component({
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {
  yggdrasil: any;

  constructor(private noticeService: NoticeService,
              private userService: UserService) {
    this.yggdrasil = {
      username: '未验证',
      uuid: '未验证',
      isAuth: false,
    };
  }

  ngOnInit() {
    this.getYggdrasilInfo();
  }

  getYggdrasilInfo(): void {
    this.userService.getUserProfile()
      .then(profile => {
        if (profile['yggdrasil']) {
          this.yggdrasil = profile['yggdrasil'];
          this.yggdrasil.isAuth = true;
        }
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
