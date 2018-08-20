import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {RmcaService} from '../../rmca.service';

import {IUser} from '../../../../../@model/user/user.interface';

@Component({
  styleUrls: ['./user-unban-modal.component.scss'],
  templateUrl: './user-unban-modal.component.html',
})

export class UserUnbanModalComponent {
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

  public unbanUser(): void {
    this.submitted = true;

    this.rmcaService.unBanUser(this.user._id)
      .then(updateState => {
        this.noticeService.success('解封用户成功', `解封 ${this.user.username} 用户成功`);
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

        this.noticeService.error('解封用户失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
