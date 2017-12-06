import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';

import {ManagerService} from '../../manager.service';

@Component({
  selector: 'ngx-server-detail-modal',
  styleUrls: ['./server-detail-modal.component.scss'],
  templateUrl: './server-detail-modal.component.html',
})

export class ServerDetailModalComponent implements OnInit {
  @Input() serverId;
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

  public ngOnInit(): void {
    this.managerService.getServer(this.serverId)
      .then(server => {
        this.server = server;
      })
      .catch(error => {
        this.noticeService.error('获取服务器详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public updateServer(): void {
    this.submitted = true;

    this.managerService.updateServer(this.server.serverId, this.server.name, this.server.endpoint, this.server.announce, this.server.dynmap)
      .then(updateState => {
        this.noticeService.success('更新成功', '更新服务器详情成功');
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

        this.noticeService.error('更新角色详情失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
