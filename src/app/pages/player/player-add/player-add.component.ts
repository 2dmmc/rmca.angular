import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-add',
  styleUrls: ['./player-add.component.scss'],
  templateUrl: './player-add.component.html',
})

export class PlayerAddComponent {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private router: Router) {
  }

  role: any = {
    rolename: '',
  };
  submitted: boolean;

  isSubmitted(): boolean {
    return this.submitted;
  }

  addRole(): void {
    this.playerService.addRole(this.role.rolename)
      .then(createState => {
        this.noticeService.success('创建成功', '添加角色成功');
        this.router.navigate(['/pages/player/list']);
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 409: {
            errorMessage = '角色名已存在';
            break;
          }
          case 450: {
            errorMessage = '当前角色数量超过用户账号限制';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('添加角色失败', errorMessage);
      });
  }
}
