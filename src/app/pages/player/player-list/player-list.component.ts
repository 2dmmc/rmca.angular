import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-list',
  styleUrls: ['./player-list.component.scss'],
  templateUrl: './player-list.component.html',
})

export class PlayerListComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private router: Router) {
  }

  roles: any = [];
  updated: boolean;

  ngOnInit() {
    this.getRoles();
  }

  getRoles(): void {
    this.playerService.getRoles()
      .then((roles: any) => {
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
    this.updated = true;

    this.playerService.updateYggdrasilSkin(roleId)
      .then(updateState => {
        this.updated = false;

        this.noticeService.success('同步成功', '同步正版皮肤成功, 皮肤显示稍有延迟, 请等待1-3分钟即可');
        this.getRoles();
      })
      .catch(error => {
        this.updated = false;

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

  isUpdate(): boolean {
    return this.updated;
  }
}
