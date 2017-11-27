import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-detail',
  styleUrls: ['./player-detail.component.scss'],
  templateUrl: './player-detail.component.html',
})

export class PlayerDetailComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              protected activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  role: any = {
    rolename: '',
  };

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        this.playerService.getRole(params['id'])
          .then(role => {
            this.role = role;
          })
          .catch(error => {
            this.noticeService.error('获取角色详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
          });
      });
  }

  submitted: boolean;

  isSubmitted(): boolean {
    return this.submitted;
  }

  getFiles(event): void {
    const files = event.srcElement.files;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(files[0]);
  }

  _handleReaderLoaded(readerEvt): void {
    const binaryString = readerEvt.target.result;
    this.role.file = btoa(binaryString);
  }

  updateRole(): void {
    this.submitted = false;

    this.playerService.updateRole(this.role._id, this.role.userModel, this.role.file)
      .then(updateState => {
        this.noticeService.success('更新成功', '更新角色详情成功');
        this.router.navigate(['/pages/player/list']);
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
}
