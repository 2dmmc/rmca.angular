import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {RmcaService} from '../rmca.service';

import {UserModel} from '../../../@model/user.model';

import {UserBanModalComponent} from '../users/user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from '../users/user-unban-modal/user-unban-modal.component';
import {AdminGrantModalComponent} from './admin-grant-modal/admin-grant-modal.component';
import {AdminRevokeModalComponent} from './admin-revoke-modal/admin-revoke-modal.component';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  userId: string;
  user: UserModel;

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

  public banUser(user: UserModel): void {
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

  public grantAdmin(user: UserModel): void {
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

  public revokeAdmin(user: UserModel): void {
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

  public enterImpersonate(): void {
    this.rmcaService.enterImpersonate(this.userId)
      .then(enterState => {
        this.noticeService.success('替身登陆成功', `替身登陆 ${this.user.username} 成功, 即将装弹`);
        setTimeout(() => {
          window.location.reload();
        }, 3e3);
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 409: {
            errorMessage = '你当前已经处于替身模式下';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('替身登录失败', errorMessage);
      });
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
