import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {IUserExtend, UserState} from '../../../@model/common/user/user.interface';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';

export interface IUserExtendProfile extends IUserExtend {
  stateColor: StateColor;
}

export enum StateColor {
  danger = 'danger',
  warning = 'warning',
  success = 'success',
}

@Component({
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: IUserExtendProfile;

  constructor(private noticeService: NoticeService,
              private authUtilService: AuthUtilService) {
  }

  public ngOnInit(): void {
    this.user = ProfileComponent.extendUser(this.authUtilService.user);
  }

  public async updateUserProfile(): Promise<void> {
    try {
      this.user = ProfileComponent.extendUser(await this.authUtilService.updateUser());
    } catch (error) {
      this.noticeService.error(
        '获取用户信息失败, 请刷新页面重试',
        `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
      );
    }
  }

  private static extendUser(user: IUserExtend): IUserExtendProfile {
    const extendUserProfile = user as IUserExtendProfile;

    switch (user.state) {
      case UserState.BANNED:
        extendUserProfile.stateColor = StateColor.danger;
        break;
      case UserState.NEED_EMAIL_VALIDATION:
        extendUserProfile.stateColor = StateColor.warning;
        break;
      case UserState.NORMAL:
      default:
        extendUserProfile.stateColor = StateColor.success;
    }

    return extendUserProfile;
  }
}
