import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
  filter: {
    type: string,
    types: any,
  };
  search: {
    keyWord: string,
    submitted: boolean;
  };
  users: UserModel[];
  page: number;
  pageArray: number[];
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
        search: 'search',
        onlyAdmin: 'onlyAdmin',
        onlyBan: 'onlyBan',
      },
    };
    this.users = [];
    this.page = 1;
    this.pageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.limit = 10;
  }

  public ngOnInit(): void {
    this.getUsers('', this.page, this.limit);
  }

  // FIXME 废弃了
  // private getUsers(page: number, limit: number): void {
  //   this.rmcaService.getUsers(page, limit)
  //     .then(users => {
  //       this.users = users as UserModel[];
  //     })
  //     .catch(error => {
  //       this.noticeService.error('获取用户列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
  //     });

  public searchUser(): void {
    this.search.submitted = true;

    this.rmcaService.searchUsers(this.search.keyWord, this.page, this.limit)
      .then(users => {
        this.search.submitted = false;
        this.users = users as UserModel[];
      })
      .catch(error => {
        this.search.submitted = false;
        this.noticeService.error('获取搜索结果失败', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public pageChange(page): void {
    this.getUsers(this.search.keyWord, page, this.limit);
  }


  public goToUserDetail(userId): void {
    this.router.navigate(['/pages/admin/rmca/user', userId]);
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

  // }
  private getUsers(keyword: string, page: number, limit: number): void {
    this.rmcaService.searchUsers(keyword, page, limit)
      .then(users => {
        this.users = users as UserModel[];
      })
      .catch(error => {
        this.noticeService.error('获取用户列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }
}
