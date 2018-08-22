import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../@core/data/auth.service';
import {AuthNoticeComponent} from '../auth-notice/auth-notice.component';
import {CommonUtilService} from '../../../@core/utils/common-util.service';

import {passwordEqualValidator} from '../../../@core/directives';

@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
  public registryForm: FormGroup;
  public submitted: boolean;
  @ViewChild(AuthNoticeComponent) notice: AuthNoticeComponent;

  constructor(private router: Router,
              private authService: AuthService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.registryForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(/^[_a-zA-Z0-9]{6,16}$/),
        ],
      ),
      email: new FormControl(
        '', [
          Validators.required,
          Validators.pattern(/.+@.+..+/),
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
      terms: new FormControl(
        false, [
          Validators.requiredTrue,
        ],
      ),
    });
  }

  public async register(registryForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.authService.register(registryForm.username, registryForm.email, registryForm.password);
      this.notice.show(
        'success',
        '注册成功',
        '欢迎加入炉心工艺, 即将跳转到登录页',
      );
      await this.commonUtilService.sleep(3e3);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      this.submitted = false;

      const errorMessageMap = {
        409: '用户已存在',
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
