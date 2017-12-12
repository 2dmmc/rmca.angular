import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {RmcaService} from '../rmca.service';

import {UserModel} from '../../../@model/user.model';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  userId: string;
  user: UserModel;

  constructor(private noticeService: NoticeService,
              private rmcaService: RmcaService,
              private activatedRoute: ActivatedRoute) {
    this.user = {
      username: null,
      email: null,
    };
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });

    this.getUser(this.userId);
  }

  private getUser(userId): void {
    this.rmcaService.getUser(userId)
      .then(user => {
        this.user = user as UserModel;
      })
      .catch(error => {
        this.noticeService.error('获取用户详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
