import {Component, OnInit, ViewChild} from '@angular/core';

import {AuthService} from '../../../@core/data/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeComponent} from '../auth-notice/auth-notice.component';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

@Component({
  selector: 'ngx-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
})

export class RequestPasswordComponent implements OnInit {
  public requestPasswordForm: FormGroup;
  public submitted: boolean;
  @ViewChild(AuthNoticeComponent) notice: AuthNoticeComponent;

  constructor(private authService: AuthService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.requestPasswordForm = new FormGroup({
      email: new FormControl(
        '', [
          Validators.required,
          Validators.email,
        ],
      ),
    });
  }

  public async requestPassword(requestPasswordForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.authService.requestResetPassword(requestPasswordForm.email);
      this.notice.show(
        'success',
        '发送成功',
        `我们已经发送了一封邮件到你的邮箱里 (${requestPasswordForm.email}), 请根据邮件内容找回你的密码. 如没有收到,请查看垃圾箱或尝试重新发送邮件`,
      );
      await this.commonUtilService.sleep(60e3);
      this.submitted = false;
    } catch (error) {
      this.submitted = false;

      const errorMessageMap = {
        404: '邮箱不存在',
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
