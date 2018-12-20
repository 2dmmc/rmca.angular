import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {RmcaService} from '../../rmca.service';

import {IUser} from '../../../../../@model/common/user/user.interface';

import {UserBanModalComponent} from './user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from './user-unban-modal/user-unban-modal.component';
import {AdminGrantModalComponent} from './admin-grant-modal/admin-grant-modal.component';
import {AdminRevokeModalComponent} from './admin-revoke-modal/admin-revoke-modal.component';
import {EnterImpersonateModalComponent} from './enter-impersonate-modal/enter-impersonate-modal.component';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  userId: string;
  user: IUser;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService,
              private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
    });

    this.getUser(this.userId);
  }

  public banUser(user: IUser): void {
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

  public unBanUser(user: IUser): void {
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

  public grantAdmin(user: IUser): void {
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

  public revokeAdmin(user: IUser): void {
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

  public enterImpersonate(user: IUser): void {
    const activeModal = this.modalService.open(EnterImpersonateModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.user = user;
  }

  private async getUser(userId): Promise<void> {
    try {
      this.user = await this.rmcaService.getUser(userId) as IUser;
    } catch (error) {
      const errorMessageMap = {};
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('获取用户详情失败', errorMessage);
      console.error(error);
    }
  }
}
