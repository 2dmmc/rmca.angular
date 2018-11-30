import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {RmcaService} from '../rmca.service';

import {IAdminRmcaUsersUser} from '../../../../@model/common/admin/rmca/users/user.interface';
import {UserBanModalComponent} from './user-ban-modal/user-ban-modal.component';
import {UserUnbanModalComponent} from './user-unban-modal/user-unban-modal.component';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {IUser, UserState} from '../../../../@model/common/user/user.interface';

@Component({
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  public users: IAdminRmcaUsersUser[];
  public UserStateEnum = UserState;

  public page: number;
  public limit: number;
  public count: number;


  public loading: boolean;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private rmcaService: RmcaService,
              private router: Router,
              private authUtilService: AuthUtilService) {
    this.users = [];
    this.page = 1;
    this.limit = 10;
    this.count = 1;
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getUsers(this.page, this.limit);
  }

  public async getUsers(page: number, limit: number): Promise<void> {
    this.loading = true;

    try {
      const usersResponse = await this.rmcaService.getUsers(page, limit);
      const users = usersResponse['data'];
      this.count = usersResponse['count'];
      this.users = users.map((user: IUser) => this.authUtilService.extendUserModel(user));
    } catch (error) {
      this.noticeService.error('获取用户列表失败', '获取用户列表失败, 请刷新页面重试');
    }

    this.loading = false;
  }


  // public filterAll(): void {
  //   this.page = 1;
  //   this.getUsers(this.page, this.limit);
  // }
  //
  // public filterAdmin(): void {
  //   this.page = 1;
  //   this.searchUser(this.search.keyWord, this.page, this.limit, true, false);
  // }
  //
  // public filterBanned(): void {
  //   this.page = 1;
  //   this.searchUser(this.search.keyWord, this.page, this.limit, false, true);
  // }
  //
  // public searchClick(): void {
  //   this.page = 1;
  //   this.searchUser(this.search.keyWord, this.page, this.limit,
  //     this.filter.type === this.filter.types.onlyAdmin,
  //     this.filter.type === this.filter.types.onlyBan);
  // }


  public openBanUserModal(user: IAdminRmcaUsersUser): void {
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

  public openUnBanUserModal(user: IAdminRmcaUsersUser): void {
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

  public goToUserDetail(userId): void {
    this.router.navigate(['/pages/admin/rmca/user', userId]);
  }

  // private searchUser(keyword: string, page: number, limit: number, isAdmin?: boolean, isBanned?: boolean): void {
  //   this.search.submitted = true;
  //
  //   this.rmcaService.searchUsers(keyword, page, limit, isAdmin, isBanned)
  //     .then(users => {
  //       this.search.submitted = false;
  //       this.users = users as IAdminRmcaUsersUser[];
  //     })
  //     .catch(error => {
  //       this.search.submitted = false;
  //       this.noticeService.error(
  //         '获取搜索结果失败',
  //         `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
  //       );
  //     });
  // }
}
