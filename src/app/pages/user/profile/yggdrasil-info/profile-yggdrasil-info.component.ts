import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../../../@core/data/user.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

import {IUser} from '../../../../@model/common/user/user.interface';
import {ProfileComponent} from '../profile.component';

@Component({
  selector: 'ngx-profile-yggdrasil-info',
  styleUrls: ['./profile-yggdrasil-info.component.scss'],
  templateUrl: './profile-yggdrasil-info.component.html',
})

export class ProfileYggdrasilInfoComponent implements OnInit {
  @Input() user: IUser;

  public updating: boolean;
  public submitted: boolean;
  public flaped: boolean;

  public updateYggdrasilInfoForm: FormGroup;

  constructor(private userService: UserService,
              private noticeService: NoticeService,
              private commonUtilService: CommonUtilService,
              @Inject(forwardRef(() => ProfileComponent)) private _parent: ProfileComponent) {
    this.updating = false;
    this.submitted = false;
    this.flaped = false;
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

  public flipCard(): void {
    this.flaped = !this.flaped;
  }

  public async updateYggdrasil(yggdrasilForm) {
    this.submitted = true;

    try {
      await this.userService.updateUserYggdrasil(yggdrasilForm.username, yggdrasilForm.password);
      this.noticeService.success('更新成功', '更新正版验证状态成功');
      this.updateYggdrasilInfoForm.reset();

      this.flipCard();
      await this.updateUserProfile();
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

  // FIXME 整体逻辑需优化, 太冗余
  public async updateUserProfile() {
    this.updating = true;

    await this._parent.updateUserProfile();

    await this.commonUtilService.sleep(0.7e3);
    this.updating = false;
  }
}
