import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';

import {passwordEqualValidator} from '../../../../@core/directives';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

@Component({
  selector: 'ngx-profile-update-password',
  styleUrls: ['./profile-update-password.component.scss'],
  templateUrl: './profile-update-password.component.html',
})

export class ProfileUpdatePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public submitted: boolean;

  constructor(private router: Router,
              private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              private userService: UserService) {
    this.submitted = false;
  }

  public ngOnInit() {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(
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
      await this.userService.updateUserPassword(passwordForm.currentPassword, passwordForm.repeatPassword);
      this.noticeService.success('更新密码成功', '更新密码成功');
      this.router.navigate(['/auth/logout']);
    } catch (error) {
      const errorMessageMap = {
        403: '当前密码错误',
      };
      this.noticeUtilService.errorNotice(error, '更新密码失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
