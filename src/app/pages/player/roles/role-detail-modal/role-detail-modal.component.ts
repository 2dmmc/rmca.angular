import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {PlayerService} from '../../player.service';

import {User} from '../../../../@model/user/user.interface';
import {DefaultUser} from '../../../../@model/user/user.const';

import {Role} from '../../../../@model/player/role/role.interface';

import {UserCacheService} from '../../../../@system/cache/service/user-cache.service';

@Component({
  styleUrls: ['./role-detail-modal.component.scss'],
  templateUrl: './role-detail-modal.component.html',
})

export class RoleDetailModalComponent implements OnInit {
  @Input() role: Role;
  @Output() event = new EventEmitter();
  user: User;

  submitted: boolean;
  skinType: any;

  constructor(private playerService: PlayerService,
              private userCacheService: UserCacheService,
              private noticeService: NoticeService,
              private activeModal: NgbActiveModal) {
    this.user = DefaultUser;
    this.submitted = false;
    this.skinType = 'upload';
  }

  public ngOnInit(): void {
    this.user = this.userCacheService.getCache();
  }

  public getFiles(event, type): void {
    if (event.srcElement) {
      const files = event.srcElement.files;

      if (files.length > 0) {
        switch (type) {
          case 'skin': {
            this.role['skinFile'] = files[0];
            break;
          }
          case 'cape': {
            this.role['capeFile'] = files[0];
            break;
          }
          default: {
            console.warn('getFiles type is default');
          }
        }
      }
    }
  }

  // FIXME 图片预览被砍掉了, 有空的时候加上
  // private _handleReaderLoaded(readerEvt): void {
  //   const binaryString = readerEvt.target.result;
  //   this.role.file = btoa(binaryString);
  // }

  public async updateRole() {
    this.submitted = true;

    try {
      if (this.role['skinFile']) {
        await this.playerService.updateRoleSkin(this.role._id, this.role.userModel, this.role['skinFile']);
      }
      if (this.role['capeFile']) {
        await this.playerService.updateRoleCape(this.role._id, this.role['capeFile']);
      }

      this.noticeService.success('更新成功', '更新角色详情成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
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
    }
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
