import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

import {RoleAddModalComponent} from './role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './role-detail-modal/role-detail-modal.component';

import {Role} from '../../../@model/player/role/role.interface';

@Component({
  styleUrls: ['./roles.component.scss'],
  templateUrl: './roles.component.html',
})

export class RolesComponent implements OnInit {
  roles: Role[];

  constructor(private noticeService: NoticeService,
              private playerService: PlayerService,
              private modalService: NgbModal) {
    this.roles = [];
  }

  public ngOnInit(): void {
    this.getRoles();
  }

  public async getRoles(): Promise<void> {
    try {
      const roles = await this.playerService.getRoles() as Role[];

      roles.forEach(role => {
        role['skin'] = `/api/role/skin/${role._id}?${Math.random()}`;
        role['cape'] = `/api/role/cape/${role._id}?${Math.random()}`;
      });

      this.roles = roles;
    } catch (error) {
      this.noticeService.error('获取角色列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      console.trace(error);
    }
  }

  public async getRole(roleId: string): Promise<Role> {
    try {
      const role = await this.playerService.getRole(roleId) as Role;
      role['skin'] = `/api/role/skin/${role._id}?${Math.random()}`;
      role['cape'] = `/api/role/cape/${role._id}?${Math.random()}`;

      return role;
    } catch (error) {
      this.noticeService.error('获取角色详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      console.trace(error);
    }
  }

  public updateDefaultRole(role: Role): void {
    this.playerService.updateDefaultRole(role._id)
      .then(updateState => {
        this.noticeService.success('更新成功', `更新默认角色成功, 默认角色已更换为 ${role.rolename}`);
        this.getRoles();
      })
      .catch(error => {
        let errorMessage = '';

        switch (error.status) {
          case 403: {
            errorMessage = '角色属组不存在?';
            break;
          }
          case 404: {
            errorMessage = '角色不存在';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('更新默认角色失败', errorMessage);
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
