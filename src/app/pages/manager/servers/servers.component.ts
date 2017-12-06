import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ManagerService} from '../manager.service';
import {NoticeService} from '../../../@system/notice/notice.service';

import {ServerAddModalComponent} from './server-add-modal/server-add-modal.component';
import {ServerDetailModalComponent} from './server-detail-modal/server-detail-modal.component';

@Component({
  selector: 'ngx-services',
  styleUrls: ['./servers.component.scss'],
  templateUrl: './servers.component.html',
})

export class ServersComponent implements OnInit {
  servers: any;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private managerService: ManagerService) {
    this.servers = [];
  }

  public ngOnInit(): void {
    this.getServers();
  }

  public getServers(): void {
    this.managerService.getServers()
      .then((servers: any) => {
        this.servers = servers;
      })
      .catch(error => {
        this.noticeService.error('获取服务器列表失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public openServerAddModal(): void {
    const activeModal = this.modalService.open(ServerAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getServers();
    });
  }

  public openServerDetailModal(serverId: string): void {
    const activeModal = this.modalService.open(ServerDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.serverId = serverId;

    activeModal.componentInstance.event.subscribe(() => {
      this.getServers();
    });
  }
}
