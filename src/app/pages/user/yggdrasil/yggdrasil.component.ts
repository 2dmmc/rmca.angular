import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-profile',
  styleUrls: ['./yggdrasil.component.scss'],
  templateUrl: './yggdrasil.component.html',
})
export class YggdrasilComponent implements OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  yggdrasil: any = {};

  ngOnInit() {
    this.yggdrasil = {
      username: '未验证',
      uuid: '未验证',
      isAuth: false,
    };

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
