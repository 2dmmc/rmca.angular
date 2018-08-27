import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

import {IUser} from '../../../../@model/common/user/user.interface';

@Component({
  selector: 'ngx-profile-user-info',
  styleUrls: ['./profile-user-info.component.scss'],
  templateUrl: './profile-user-info.component.html',
})

export class ProfileUserInfoComponent implements OnInit {
  @Input() user: IUser;
  public profileForm: FormGroup;
  public submitted: boolean;

  constructor(private router: Router,
              private noticeService: NoticeService,
              private userService: UserService,
              private commonUtilService: CommonUtilService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.profileForm = new FormGroup({
      email: new FormControl(
        this.user.email, [
          Validators.required,
          Validators.email,
        ],
      ),
    });
  }

  public async updateProfile(profileForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.userService.updateUserProfile(profileForm.email);
      this.noticeService.success(
        '更新个人资料成功',
        `更新个人资料成功, 你的邮箱已更换为${profileForm.email}`,
      );
    } catch (error) {
      this.noticeService.error(
        '更新个人资料失败',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
      console.error(error);
    }

    await this.commonUtilService.sleep(0.7e3);
    this.submitted = false;
  }
}
