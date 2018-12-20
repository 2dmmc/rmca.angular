import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {FmcService} from '../../../../../@core/data/fmc.service';
import {IServer} from '../../../../../@model/common/admin/fmc/server/server.interface';

import {valueEqualValidator} from '../../../../../@core/directives';

@Component({
  styleUrls: ['./server-delete-modal.component.scss'],
  templateUrl: './server-delete-modal.component.html',
})

export class ServerDeleteModalComponent implements OnInit {
  @Input() server: IServer;
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
          valueEqualValidator(this.server.name),
        ],
      ),
    });
  }

  public async deleteServer(): Promise<void> {
    this.submitted = true;

    try {
      await this.fmcService.deleteServer(this.server._id);
      this.noticeService.success(
        '删除成功',
        `删除${this.server.name}服务器成功`,
      );
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '服务器不存在',
      };
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('删除服务器失败', errorMessage);
      console.error(error);
    }

    this.submitted = false;
  }
}
