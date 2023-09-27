import {Component, OnInit} from '@angular/core';

import {IUser} from '../../../@model/common/user/user.interface';
import {AuthUtilService} from '../../../@core/utils/auth-util.service';

@Component({
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})

export class SocialsComponent implements OnInit {
  public user: IUser;

  constructor(private authUtilService: AuthUtilService) {
  }

  public ngOnInit(): void {
    this.user = this.authUtilService.user;
  }
}
