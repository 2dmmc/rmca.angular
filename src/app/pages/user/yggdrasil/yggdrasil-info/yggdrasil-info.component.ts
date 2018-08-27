import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

@Component({
  selector: 'ngx-yggdrasil-info',
  styleUrls: ['./yggdrasil-info.component.scss'],
  templateUrl: './yggdrasil-info.component.html',
})

export class YggdrasilInfoComponent implements OnInit {
  public updateYggdrasilInfoForm: FormGroup;
  public submitted: boolean;

  constructor(private userService: UserService,
              private noticeService: NoticeService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
  }

  public async ngOnInit() {
    this.updateYggdrasilInfoForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
        ],
      ),
      password: new FormControl(
        '', [
          Validators.required,
        ],
      ),
    });
  }

  public async updateYggdrasil(yggdrasilForm) {
    this.submitted = true;

    try {
      await this.userService.updateUserYggdrasil(yggdrasilForm.username, yggdrasilForm.password);
      this.noticeService.success('更新成功', '更新正版验证状态成功');
      this.updateYggdrasilInfoForm.reset();
    } catch (error) {
      const errorMessageMap = {
        403: '用户名或密码错误',
        406: 'no selectedProfile 一般不会出现，需要去mojang页面手工选择一下profile',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.noticeService.error(
        '更新正版验证状态失败',
        errorMessage,
      );
      console.error(error);
    }

    await this.commonUtilService.sleep(0.7e3);
    this.submitted = false;
  }
}
