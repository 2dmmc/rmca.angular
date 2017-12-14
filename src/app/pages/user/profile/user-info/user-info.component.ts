import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../user.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

import {UserModel} from '../../../@model/user.model';

@Component({
  selector: 'ngx-user-info',
  styleUrls: ['./user-info.component.scss'],
  templateUrl: './user-info.component.html',
})

export class UserInfoComponent implements OnInit {
  @Input() user: UserModel;
  @Output() needGetUserProfile = new EventEmitter();
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (queryParams.hash) {
        // TODO 验证失败与否移除掉URL中的params
        this.verifyEmail(queryParams.hash);
        this.needGetUserProfile.emit();
      }
    });
  }

  public updateProfile(): void {
    this.submitted = true;

    this.userService.updateUserProfile(this.user.email)
      .then(updateState => {
        this.noticeService.success('更新个人资料成功', `更新个人资料成功, 你的邮箱已更换为${this.user.email}`);
        this.needGetUserProfile.emit();
        this.submitted = false;
      })
      .catch(error => {
        this.noticeService.error('更新个人资料失败', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
        this.submitted = false;
      });
  }

  public verifyEmail(hash): void {
    this.userService.verifyEmail(hash)
      .then(updateState => {
        this.needGetUserProfile.emit();
        this.noticeService.success('验证邮箱成功', '验证邮箱成功');
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 404: {
            errorMessage = '验证码无效或已被使用, 请重新验证邮箱';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('验证邮箱失败', errorMessage);
      });
  }

  public resendVerifyEmail(): void {
    this.userService.resendVerifyEmail()
      .then(resendState => {
        this.noticeService.success('发送验证邮件成功', '重新发送验证邮件成功, 请到邮箱去查看. 如没有收到,请尝试重新发送验证邮件或稍后重试');
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 412: {
            errorMessage = '该邮箱已经验证';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('发送验证邮件失败', errorMessage);
      });
  }
}
