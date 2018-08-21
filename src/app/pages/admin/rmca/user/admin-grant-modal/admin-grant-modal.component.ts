import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {RmcaService} from '../../rmca.service';

import {IUser} from '../../../../../@model/common/user/user.interface';

@Component({
  styleUrls: ['./admin-grant-modal.component.scss'],
  templateUrl: './admin-grant-modal.component.html',
})

export class AdminGrantModalComponent {
  @Input() user: IUser;
  @Output() event = new EventEmitter();
  username: string;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.username = null;
    this.submitted = false;
  }

  public grantAdmin(): void {
    this.submitted = true;

    this.rmcaService.grantAdmin(this.user._id)
      .then(updateState => {
        this.noticeService.success('授予管理员成功', `授予 ${this.user.username} 管理员成功`);
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 404: {
            errorMessage = '找不到这个用户';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('授予管理员失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
