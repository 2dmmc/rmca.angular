import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {ManagerService} from '../../manager.service';

@Component({
  selector: 'ngx-server-detail-modal',
  styleUrls: ['./server-delete-modal.component.scss'],
  templateUrl: './server-delete-modal.component.html',
})

export class ServerDeleteModalComponent {
  @Input() serverId;
  @Input() serverName;
  @Output() event = new EventEmitter();
  formName: string;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private managerService: ManagerService) {
    this.formName = '';
    this.submitted = false;
  }

  public deleteServer(): void {
    this.submitted = true;

    this.managerService.deleteServer(this.serverId)
      .then(updateState => {
        this.noticeService.success('删除成功', `删除${this.serverName}服务器成功`);
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 404: {
            errorMessage = '找不到这个服务器';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('删除服务器失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
