import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {FmcService} from '../../../../../@core/data/fmc.service';

import {IServer} from '../../../../../@model/common/admin/fmc/server/server.interface';

@Component({
  styleUrls: ['./server-add-modal.component.scss'],
  templateUrl: './server-add-modal.component.html',
})

export class ServerAddModalComponent implements OnInit {
  @Output() event = new EventEmitter();

  public serverForm: FormGroup;
  public submitted: boolean;

  constructor(private noticeService: NoticeService,
              public activeModal: NgbActiveModal,
              private fmcService: FmcService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
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
  }


  public async addServer(serverForm: IServer): Promise<void> {
    this.submitted = true;

    try {
      await this.fmcService.addServer(serverForm);
      this.noticeService.success(
        '新增成功',
        '新增服务器成功',
      );
      this.event.emit(serverForm);
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        409: '服务器名已存在',
      };
      const errorMessage = errorMessageMap[error.status] || '未知错误, 请联系鹳狸猿';

      this.noticeService.error('新增服务器失败', errorMessage);
    }

    this.submitted = false;
  }
}
