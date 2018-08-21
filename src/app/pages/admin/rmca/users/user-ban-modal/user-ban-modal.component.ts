import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {RmcaService} from '../../rmca.service';

import {IUser} from '../../../../../@model/common/user/user.interface';

@Component({
  styleUrls: ['./user-ban-modal.component.scss'],
  templateUrl: './user-ban-modal.component.html',
})

export class UserBanModalComponent {
  @Input() user: IUser;
  @Output() event = new EventEmitter();
  reason: string;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.reason = null;
    this.submitted = false;
  }

  public banUser(): void {
    this.submitted = true;

    this.rmcaService.banUser(this.user._id, this.reason)
      .then(updateState => {
        this.noticeService.success('封禁用户成功', `封禁 ${this.user.username} 用户成功`);
        this.event.emit(this.reason);
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

        this.noticeService.error('封禁用户失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
