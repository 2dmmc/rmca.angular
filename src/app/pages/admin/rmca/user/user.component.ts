import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {RmcaService} from '../rmca.service';

import {User} from '../../../../@model/user/user.interface';

import {UserBanModalComponent} from '../users/user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from '../users/user-unban-modal/user-unban-modal.component';
import {AdminGrantModalComponent} from './admin-grant-modal/admin-grant-modal.component';
import {AdminRevokeModalComponent} from './admin-revoke-modal/admin-revoke-modal.component';
import {EnterImpersonateModalComponent} from './enter-impersonate-modal/enter-impersonate-modal.component';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  userId: string;
  user: User;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
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

  public banUser(user: User): void {
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

  public unBanUser(user: User): void {
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

  public grantAdmin(user: User): void {
    const activeModal = this.modalService.open(AdminGrantModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.user = user;
    activeModal.componentInstance.event.subscribe(() => {
      user.admin = true;
    });
  }

  public revokeAdmin(user: User): void {
    const activeModal = this.modalService.open(AdminRevokeModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.user = user;
    activeModal.componentInstance.event.subscribe(() => {
      user.admin = false;
    });
  }

  public enterImpersonate(user: User): void {
    const activeModal = this.modalService.open(EnterImpersonateModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.user = user;
  }

  private getUser(userId): void {
    this.rmcaService.getUser(userId)
      .then(user => {
        this.user = user as User;
      })
      .catch(error => {
        this.noticeService.error('获取用户详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
