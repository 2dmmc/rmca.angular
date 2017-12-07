import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {RmcaService} from '../rmca.service';

import {UserModel} from '../../../@model/user.model';

@Component({
  styleUrls: ['./admins.component.scss'],
  templateUrl: './admins.component.html',
})

export class AdminsComponent implements OnInit {
  admins: UserModel[];

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService) {
    this.admins = [];
  }

  public ngOnInit(): void {
    this.getAdmins();
  }

  private getAdmins(): void {
    this.rmcaService.getAdmins()
      .then(users => {
        this.admins = users as UserModel[];
      })
      .catch(error => {
        this.noticeService.error('获取管理员列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  // public banUser(user: UserModel): void {
  //   const activeModal = this.modalService.open(UserBanModalComponent, {
  //     size: 'lg',
  //     container: 'nb-layout',
  //     backdrop: 'static',
  //   });
  //
  //   activeModal.componentInstance.user = user;
  //   activeModal.componentInstance.event.subscribe((reason: string) => {
  //     user.ban = reason;
  //   });
  // }
  //
  // public unBanUser(user: UserModel): void {
  //   const activeModal = this.modalService.open(UserUnbanModalComponent, {
  //     size: 'lg',
  //     container: 'nb-layout',
  //     backdrop: 'static',
  //   });
  //
  //   activeModal.componentInstance.user = user;
  //   activeModal.componentInstance.event.subscribe(() => {
  //     user.ban = null;
  //   });
  // }
}
