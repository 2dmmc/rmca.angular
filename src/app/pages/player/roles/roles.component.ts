import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@core/services/notice.service';

import {RoleAddModalComponent} from './role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './role-detail-modal/role-detail-modal.component';

import {IRole} from '../../../@model/common/player/role/role.interface';
import {IAnimationOptions, IOrbitControlsOptions, ISkin, ISkinViewerOptions} from '../../../@theme/components';
import {NoticeUtilService} from '../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./roles.component.scss'],
  templateUrl: './roles.component.html',
})

export class RolesComponent implements OnInit {
  public roles: IRole[];
  public skinViewerInitOptions: {
    skin?: ISkin,
    skinViewerOptions: ISkinViewerOptions,
    animationOptions: IAnimationOptions,
    controlOptions: IOrbitControlsOptions,
  };

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              private playerService: PlayerService,
              private modalService: NgbModal) {
    this.roles = [];
    this.skinViewerInitOptions = {
      animationOptions: {
        rotating: true,
        running: true,
      },
      controlOptions: {
        rotate: true,
        zoom: true,
      },
      skinViewerOptions: {
        height: 275,
        width: 275,
      },
    };
  }

  public ngOnInit(): void {
    this.getRoles();
  }

  public async getRoles(): Promise<void> {
    try {
      const roles = await this.playerService.getRoles() as IRole[];

      roles.forEach(role => {
        role['skin'] = `/api/role/skin/${role._id}?${Math.random()}`;
        role['cape'] = `/api/role/cape/${role._id}?${Math.random()}`;
      });

      this.roles = roles;
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '获取角色列表失败');
    }
  }

  public async getRole(roleId: string): Promise<IRole> {
    try {
      const role = await this.playerService.getRole(roleId) as IRole;
      role.skin = `/api/role/skin/${role._id}?${Math.random()}`;
      role.cape = `/api/role/cape/${role._id}?${Math.random()}`;

      return role;
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '获取角色详情失败');
    }
  }

  public updateDefaultRole(role: IRole): void {
    this.playerService.updateDefaultRole(role._id)
      .then(updateState => {
        this.noticeService.success('更新成功', `更新默认角色成功, 默认角色已更换为 ${role.rolename}`);
        this.getRoles();
      })
      .catch(error => {
        const errorMessageMap = {
          403: '角色属组不存在',
          404: '角色不存在',
        };
        this.noticeUtilService.errorNotice(error, '更新默认角色失败', errorMessageMap);
      });
  }

  public openRoleAddModal(): void {
    const activeModal = this.modalService.open(RoleAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getRoles();
    });
  }

  public async openRoleDetailModal(roleId: string) {
    const role = await this.getRole(roleId);
    const activeModal = this.modalService.open(RoleDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.role = role;
    activeModal.componentInstance.event.subscribe(() => {
      this.getRoles();
    });
  }
}
