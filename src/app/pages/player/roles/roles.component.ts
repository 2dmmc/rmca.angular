import {AfterViewInit, Component, OnInit} from '@angular/core';
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

export class RolesComponent implements OnInit, AfterViewInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private modalService: NgbModal) {
  }

  roles: RoleModel[];

  ngOnInit(): void {
    this.roles = [];
  }

  ngAfterViewInit(): void {
    this.getRoles();
  }

  getRoles(): void {
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

  updateDefaultRole(role): void {
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

  updateYggdrasilSkin(roleId): void {
    this.playerService.updateYggdrasilSkin(roleId)
      .then(updateState => {
        this.noticeService.success('同步成功', '同步正版皮肤成功');
        this.getRoles();
      })
      .catch(error => {
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

  showRoleAddModal(): void {
    const activeModal = this.modalService.open(RoleAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getRoles();
    });
  }

  showRoleDetailModal(id): void {
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
