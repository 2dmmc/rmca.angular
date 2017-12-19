import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {PlayerService} from '../../player.service';

import {User} from '../../../../@model/user/user.interface';
import {DefaultUser} from '../../../../@model/user/user.const';

import {Role} from '../../../../@model/player/role/role.interface';
import {DefaultRole} from '../../../../@model/player/role/role.const';

import {RoleCacheService} from '../../../../@system/cache/service/role-cache.service';
import {UserCacheService} from '../../../../@system/cache/service/user-cache.service';

@Component({
  styleUrls: ['./role-detail-modal.component.scss'],
  templateUrl: './role-detail-modal.component.html',
})

export class RoleDetailModalComponent implements OnInit {
  @Input() roleId;
  @Output() event = new EventEmitter();
  role: Role;
  user: User;
  submitted: boolean;
  skinType: any;

  constructor(private playerService: PlayerService,
              private userCacheService: UserCacheService,
              private roleCacheService: RoleCacheService,
              private noticeService: NoticeService,
              private activeModal: NgbActiveModal) {
    this.submitted = false;
    this.role = DefaultRole;
    this.user = DefaultUser;
    this.skinType = 'upload';
  }

  public ngOnInit(): void {
    this.user = this.userCacheService.getCache();
    const role = this.roleCacheService.getCache(this.roleId);

    if (role == null) {
      this.getRole();
    } else {
      this.role = role;
    }
  }

  public async getRole() {
    try {
      const role = await this.playerService.getRole(this.roleId) as Role;

      role['skin'] = `https://rmca.bangbang93.com/api/role/skin/${role._id}?${Math.random()}`;

      this.roleCacheService.setCache(this.roleId, role as Role);
      this.role = role;
    } catch (error) {
      this.noticeService.error('获取角色列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      console.trace(error);
    }
  }

  public getFiles(event, roleForm): void {
    const files = event.srcElement.files;

    if (files.length > 0) {
      this.role['file'] = files[0];
    }
  }

  // FIXME 图片预览被砍掉了, 有空的时候加上
  // private _handleReaderLoaded(readerEvt): void {
  //   const binaryString = readerEvt.target.result;
  //   this.role.file = btoa(binaryString);
  // }

  public updateRole(): void {
    this.submitted = true;

    this.playerService.updateRole(this.role._id, this.role.userModel, this.role['file'])
      .then(updateState => {
        this.roleCacheService.deleteUser(this.roleId);
        this.noticeService.success('更新成功', '更新角色详情成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 415: {
            errorMessage = '图片格式不符, 请上传png';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('更新角色详情失败', errorMessage);
      });
  }

  public updateYggdrasilSkin(roleId): void {
    this.submitted = true;

    this.playerService.updateYggdrasilSkin(roleId)
      .then(updateState => {
        this.noticeService.success('同步成功', '同步正版皮肤成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 404: {
            errorMessage = '角色不存在';
            break;
          }
          case 406: {
            errorMessage = '你还没有进行正版验证';
            break;
          }
          case 550: {
            errorMessage = '服务器找不见这个uuid，理论上应该不会有这个情况';
            break;
          }
          case 551: {
            errorMessage = '你的正版账号还没设置皮肤';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('同步正版皮肤失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
