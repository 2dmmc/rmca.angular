import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {RmcaService} from '../rmca.service';

import {AdminRmcaUsersUser} from '../../../../@model/admin/rmca/users/user.interface';
import {UserBanModalComponent} from './user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from './user-unban-modal/user-unban-modal.component';

@Component({
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  filter: {
    type: string,
    types: any,
  };
  search: {
    keyWord: string,
    submitted: boolean;
  };
  users: AdminRmcaUsersUser[];
  page: number;
  limit: number;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService,
              private router: Router) {
    this.search = {
      keyWord: '',
      submitted: false,
    };
    this.filter = {
      type: 'all',
      types: {
        all: 'all',
        onlyAdmin: 'onlyAdmin',
        onlyBan: 'onlyBan',
      },
    };
    this.users = [];
    this.page = 1;
    this.limit = 10;
  }

  public ngOnInit(): void {
    this.getUsers(this.page, this.limit);
  }

  public filterAll(): void {
    this.page = 1;
    this.getUsers(this.page, this.limit);
  }

  public filterAdmin(): void {
    this.page = 1;
    this.searchUser(this.search.keyWord, this.page, this.limit, true, false);
  }

  public filterBanned(): void {
    this.page = 1;
    this.searchUser(this.search.keyWord, this.page, this.limit, false, true);
  }

  public searchClick(): void {
    this.page = 1;
    this.searchUser(this.search.keyWord, this.page, this.limit, this.filter.type == this.filter.types.onlyAdmin, this.filter.type == this.filter.types.onlyBan);
  }

  public searchKeyDown(event): void {
    if (event.keyCode == 13) {
      this.searchClick();
    }
  }

  public pageAdd(): void {
    this.page++;
    this._pageChange(this.page);
  }

  public pageKeyDown(event): void {
    if (event.keyCode == 13) {
      this._pageChange(this.page);
    }
  }

  public pageMinus(): void {
    if (this.page > 1) {
      this.page--;
      this._pageChange(this.page);
    }
  }

  public banUser(user: AdminRmcaUsersUser): void {
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

  public unBanUser(user: AdminRmcaUsersUser): void {
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

  private getUsers(page: number, limit: number): void {
    this.rmcaService.getUsers(page, limit)
      .then(users => {
        this.users = users as AdminRmcaUsersUser[];
      })
      .catch(error => {
        this.noticeService.error('获取用户列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public goToUserDetail(userId): void {
    this.router.navigate(['/pages/admin/rmca/user', userId]);
  }

  private searchUser(keyword: string, page: number, limit: number, isAdmin?: boolean, isBanned?: boolean): void {
    this.search.submitted = true;

    this.rmcaService.searchUsers(keyword, page, limit, isAdmin, isBanned)
      .then(users => {
        this.search.submitted = false;
        this.users = users as AdminRmcaUsersUser[];
      })
      .catch(error => {
        this.search.submitted = false;
        this.noticeService.error('获取搜索结果失败', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  private _pageChange(page): void {
    this.filter.type = this.filter.types.all;
    this.getUsers(page, this.limit);
  }
}
