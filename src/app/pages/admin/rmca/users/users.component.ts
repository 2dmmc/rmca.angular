import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {RmcaService} from '../rmca.service';

import {UserModel} from '../../../@model/user.model';

import {UserBanModalComponent} from './user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from './user-unban-modal/user-unban-modal.component';

@Component({
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  users: UserModel[];

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService) {
    this.users = [];
  }

  public ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.rmcaService.getUsers()
      .then(users => {
        this.users = users as UserModel[];
      })
      .catch(error => {
        this.noticeService.error('获取用户列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public banUser(user: UserModel): void {
    // FIXME 移除后门.exe
    if (user.username === 'sdjnmxd') {
      this.noticeService.info('wtf', '???');
    } else {
      const activeModal = this.modalService.open(UserBanModalComponent, {
        size: 'lg',
        container: 'nb-layout',
        backdrop: 'static',
      });

      activeModal.componentInstance.user = user;
      activeModal.componentInstance.event.subscribe((reason: string) => {
        user.ban = reason;
      });
    }

  }

  public unBanUser(user: UserModel): void {
    const activeModal = this.modalService.open(UserUnbanModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.user = user;
    activeModal.componentInstance.event.subscribe(() => {
      user.ban = null;
    });
  }
}
