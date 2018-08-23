import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';
import {AuthNoticeComponent} from '../auth-notice/auth-notice.component';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

import {passwordEqualValidator} from '../../../@core/directives';

@Component({
  selector: 'ngx-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public submitted: boolean;
  public hash: string;
  @ViewChild(AuthNoticeComponent) notice: AuthNoticeComponent;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
    this.hash = '';
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.hash = queryParams.hash;
    });

    this.resetPasswordForm = new FormGroup({
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

  public async resetPassword(resetPasswordForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.authService.resetPassword(this.hash, resetPasswordForm.password);
      this.notice.show(
        'success',
        '重置成功',
        '请使用你的新密码登陆, 即将跳转到登陆页',
      );
      await this.commonUtilService.sleep(3e3);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.submitted = false;

      const errorMessageMap = {
        403: '令牌无效或已被使用, 请重新找回密码',
      };
      const errorTitle = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.notice.show(
        'danger',
        '' + errorTitle,
        `message: ${error.error.message} | code: ${error.status}`,
      );
    }
  }
}
