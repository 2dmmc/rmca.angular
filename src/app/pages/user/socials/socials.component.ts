import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../@core/services/notice.service';

import {IUser} from '../../../@model/common/user/user.interface';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';

@Component({
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})

export class SocialsComponent implements OnInit {
  public user: IUser;

  constructor(private noticeService: NoticeService,
              private authUtilService: AuthUtilService) {
  }

  public ngOnInit(): void {
    this.user = this.authUtilService.user;
  }
}
