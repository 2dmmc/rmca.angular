import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {ManagerService} from '../../manager.service';

import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-server-add-modal',
  styleUrls: ['./server-add-modal.component.scss'],
  templateUrl: './server-add-modal.component.html',
})

export class ServerAddModalComponent {
  @Output() event = new EventEmitter();
  server: any;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private managerService: ManagerService) {
    this.server = {
      name: '',
    };
    this.submitted = false;
  }

  public addRole(): void {
    this.managerService.addServer(this.server.name)
      .then(createState => {
        this.noticeService.success('创建成功', '添加服务器成功');
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

        this.noticeService.error('添加服务器失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
