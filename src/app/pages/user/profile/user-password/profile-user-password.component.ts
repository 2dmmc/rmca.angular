import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

import {passwordEqualValidator} from '../../../../@core/directives';

@Component({
  selector: 'ngx-profile-user-password',
  styleUrls: ['./profile-user-password.component.scss'],
  templateUrl: './profile-user-password.component.html',
})

export class ProfileUserPasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public submitted: boolean;

  constructor(private noticeService: NoticeService,
              private userService: UserService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
  }

  public ngOnInit() {
    this.changePasswordForm = new FormGroup({
      nowPassword: new FormControl(
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ),
      password: new FormControl(
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ),
      repeatPassword: new FormControl(
        '', [
          Validators.required,
          passwordEqualValidator,
        ],
      ),
    });
  }

  public async updatePassword(passwordForm) {
    this.submitted = true;

    try {
      await this.userService.updateUserPassword(passwordForm.password, passwordForm.newPassword);
      this.noticeService.success('更新密码成功', '更新密码成功');
    } catch (error) {
      const errorMessageMap = {
        403: '当前密码错误',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.noticeService.error(
        '更新密码失败',
        errorMessage,
      );
      console.error(error);
    }

    await this.commonUtilService.sleep(0.7e3);
    this.submitted = false;
  }
}
