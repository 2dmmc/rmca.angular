import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {FmcService} from '../../../../../@core/data/fmc.service';

import {IServer} from '../../../../../@model/common/admin/fmc/server/server.interface';
import {NoticeUtilService} from '../../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./server-detail-modal.component.scss'],
  templateUrl: './server-detail-modal.component.html',
})

export class ServerDetailModalComponent implements OnInit {
  @Input() server: IServer;
  @Output() event = new EventEmitter();

  public serverForm: FormGroup;
  public submitted: boolean;

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public activeModal: NgbActiveModal,
              private fmcService: FmcService) {
    this.submitted = false;
  }

  public async ngOnInit(): Promise<void> {
    this.serverForm = new FormGroup({
      name: new FormControl(
        '', [
          Validators.required,
        ],
      ),
      endpoint: new FormControl(
        '', [
          Validators.required,
        ],
      ),
      announce: new FormControl(
        '', [
          Validators.required,
        ],
      ),
      dynmap: new FormControl(
        '',
      ),
    });
    this.getServer(this.server._id);
  }

  private async getServer(id: string): Promise<void> {
    this.submitted = true;

    try {
      const server = await this.fmcService.getServer(id);
      this.serverForm.setValue({
        name: server.name,
        endpoint: server.endpoint,
        announce: server.announce,
        dynmap: server.dynmap,
      });
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '获取服务器详情失败');
    }

    this.submitted = false;
  }

  public async updateServer(serverForm: IServer): Promise<void> {
    this.submitted = true;

    try {
      await this.fmcService.updateServer(this.server._id, serverForm);
      this.noticeService.success(
        '更新成功',
        '更新服务器详情成功',
      );
      this.event.emit(serverForm);
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '服务器不存在',
      };
      this.noticeUtilService.errorNotice(error, '更新服务器详情失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
