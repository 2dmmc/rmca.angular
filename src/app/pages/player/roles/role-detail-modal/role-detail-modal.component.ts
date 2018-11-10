import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

import {NoticeService} from '../../../../@core/services/notice.service';

import {PlayerService} from '../../player.service';

import {IRole} from '../../../../@model/common/player/role/role.interface';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';

@Component({
  styleUrls: ['./role-detail-modal.component.scss'],
  templateUrl: './role-detail-modal.component.html',
})

export class RoleDetailModalComponent implements OnInit {
  @Input() role: IRole;
  @Output() event = new EventEmitter();

  public skinType: string;
  public roleForm: FormGroup;
  public submitted: boolean;

  public skinFile: File;
  public capeFile: File;

  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              public authUtilService: AuthUtilService,
              public activeModal: NgbActiveModal) {
    this.submitted = false;
    this.skinType = 'upload';
    this.skinFile = null;
    this.capeFile = null;
  }

  public ngOnInit(): void {
    this.roleForm = new FormGroup({});
  }

  public getFiles(event, type): void {
    if (event.srcElement) {
      const files = event.srcElement.files;

      if (files.length > 0) {
        switch (type) {
          case 'skin': {
            this.skinFile = files[0];
            break;
          }
          case 'cape': {
            this.capeFile = files[0];
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

  public async updateRole(): Promise<void> {
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
      const errorMessageMap = {
        415: '图片格式不符, 请上传png',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.noticeService.error('更新角色详情失败', errorMessage);
      console.error(error);

      this.submitted = false;
    }
  }

  public async updateYggdrasilSkin(roleId): Promise<void> {
    this.submitted = true;

    try {
      await this.playerService.updateYggdrasilSkin(roleId);
      this.noticeService.success('同步成功', '同步正版皮肤成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '角色不存在',
        406: '你还没有进行正版验证',
        550: '服务器找不见这个uuid，理论上应该不会有这个情况',
        551: '你的正版账号还没设置皮肤',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.noticeService.error('同步正版皮肤失败', errorMessage);
      console.error(error);

      this.submitted = false;
    }
  }
}
