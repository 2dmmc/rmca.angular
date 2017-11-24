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
  yggdrasilProfile: any = {};
  submitted: boolean;

  ngOnInit() {
    this.yggdrasil = {
      username: '',
      password: '',
    };

    this.userService.getUserProfile()
      .then(profile => {
        this.yggdrasilProfile = profile['yggdrasil'];
      })
      .catch(error => {
        this.noticeService.error('获取用户信息失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  isSubmitted(): boolean {
    return this.submitted;
  }

  updateYggdrasil(): void {
    this.submitted = true;

    this.userService.updateUserYggdrasil(this.yggdrasil.username, this.yggdrasil.password)
      .then(updateState => {
        this.submitted = false;
        this.noticeService.success('更新成功', '更新正版验证状态成功');
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 403: {
            errorMessage = '用户名或密码错误';
            break;
          }
          case 406: {
            errorMessage = 'no selectedProfile 一般不会出现，需要去mojang页面手工选择一下profile';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('更新正版验证状态失败', errorMessage);
      });
  }
}
