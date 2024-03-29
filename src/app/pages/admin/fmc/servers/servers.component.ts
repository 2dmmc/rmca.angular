import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {FmcService} from '../../../../@core/data/fmc.service';

import {ServerAddModalComponent} from './server-add-modal/server-add-modal.component';
import {ServerDetailModalComponent} from './server-detail-modal/server-detail-modal.component';
import {ServerDeleteModalComponent} from './server-delete-modal/server-delete-modal.component';

import {IServer} from '../../../../@model/common/admin/fmc/server/server.interface';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

@Component({
  selector: 'ngx-servers',
  styleUrls: ['./servers.component.scss'],
  templateUrl: './servers.component.html',
})

export class ServersComponent implements OnInit {
  servers: IServer[];

  constructor(private noticeUtilService: NoticeUtilService,
              private modalService: NgbModal,
              private fmcService: FmcService) {
    this.servers = [];
  }

  public ngOnInit(): void {
    this.getServers();
  }

  public async getServers(): Promise<void> {
    try {
      this.servers = await this.fmcService.getServers();
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '获取服务器列表失败');
    }
  }

  public openServerAddModal(): void {
    const activeModal = this.modalService.open(ServerAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe((serverForm: IServer) => {
      this.getServers();
    });
  }

  public openServerDetailModal(server: IServer): void {
    const activeModal = this.modalService.open(ServerDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.server = server;

    activeModal.componentInstance.event.subscribe((serverForm: IServer) => {
      this.getServers();
    });
  }

  public openServerDeleteModal(server: IServer): void {
    const activeModal = this.modalService.open(ServerDeleteModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.server = server;

    activeModal.componentInstance.event.subscribe(() => {
      this.getServers();
    });
  }
}
