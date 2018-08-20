import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../../player.service';
import {NoticeService} from '../../../../@core/services/notice.service';

@Component({
  styleUrls: ['./role-add-modal.component.scss'],
  templateUrl: './role-add-modal.component.html',
})

export class RoleAddModalComponent {
  @Output() event = new EventEmitter();
  submitted: boolean;

  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private activeModal: NgbActiveModal) {
    this.submitted = false;
  }

  public addRole(roleForm): void {
    this.submitted = true;

    this.playerService.addRole(roleForm.rolename)
      .then(createState => {
        this.noticeService.success('新增成功', '新增角色成功');
        this.event.emit();
        this.activeModal.close();
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

        this.noticeService.error('新增角色失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
