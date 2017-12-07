import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@system/notice/notice.service';
import {AdminService} from '../../../admin.service';

import {ServerModel} from '../../../../@model/server.model';

@Component({
  selector: 'ngx-server-add-modal',
  styleUrls: ['./server-add-modal.component.scss'],
  templateUrl: './server-add-modal.component.html',
})

export class ServerAddModalComponent {
  @Output() event = new EventEmitter();
  server: ServerModel;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private managerService: AdminService) {
    this.server = {
      name: '',
      endpoint: '',
      announce: '',
      dynmap: '',
    };
    this.submitted = false;
  }

  public addServer(): void {
    this.submitted = true;

    this.managerService.addServer(this.server)
      .then(createState => {
        this.noticeService.success('新增成功', '新增服务器成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 409: {
            errorMessage = '服务器名已存在';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('新增服务器失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
