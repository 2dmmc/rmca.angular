import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

import {RoleAddModalComponent} from './role-add-modal/role-add-modal.component';
import {RoleDetailModalComponent} from './role-detail-modal/role-detail-modal.component';

import {RoleModel} from './role.model';

@Component({
  selector: 'ngx-roles',
  styleUrls: ['./roles.component.scss'],
  templateUrl: './roles.component.html',
})

export class RolesComponent implements OnInit {
  roles: RoleModel[];

  constructor(private noticeService: NoticeService,
              private playerService: PlayerService,
              private modalService: NgbModal) {
    this.roles = [];
  }

  public ngOnInit(): void {
    this.getRoles();
  }

  public getRoles(): void {
    this.playerService.getRoles()
      .then((roles: any) => {
        roles.forEach(role => {
          role['random'] = Math.random();
        });

        this.roles = roles;
      })
      .catch(error => {
        this.noticeService.error('获取角色列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public updateDefaultRole(role): void {
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

  public openRoleDetailModal(id): void {
    const activeModal = this.modalService.open(RoleDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.roleId = id;

    activeModal.componentInstance.event.subscribe(() => {
      this.getRoles();
    });
  }
}
