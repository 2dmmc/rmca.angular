import {Component, EventEmitter, Output} from '@angular/core';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';

@Component({
  selector: 'ngx-yggdrasil-info',
  styleUrls: ['./yggdrasil-info.component.scss'],
  templateUrl: './yggdrasil-info.component.html',
})

export class YggdrasilInfoComponent {
  @Output() needGetYggdrasilInfo = new EventEmitter();
  submitted: boolean;

  constructor(private userService: UserService,
              private noticeService: NoticeService) {
    this.submitted = false;
  }

  public async updateYggdrasil(yggdrasilForm) {
    this.submitted = true;

    try {
      await this.userService.updateUserYggdrasil(yggdrasilForm.username, yggdrasilForm.password);
      this.submitted = false;
      this.noticeService.success('更新成功', '更新正版验证状态成功');
      this.needGetYggdrasilInfo.emit();
    } catch (error) {
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
    }
  }
}
