import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../../@core/services/notice.service';
import {RmcaService} from '../../../rmca.service';

import {IUser} from '../../../../../../@model/common/user/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {valueEqualValidator} from '../../../../../../@core/directives/index';

@Component({
  styleUrls: ['./user-unban-modal.component.scss'],
  templateUrl: './user-unban-modal.component.html',
})

export class UserUnbanModalComponent implements OnInit {
  @Input() user: IUser;
  @Output() event = new EventEmitter();
  public submitted: boolean;
  public unbanForm: FormGroup;

  constructor(private noticeService: NoticeService,
              public activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.submitted = false;
  }

  public ngOnInit() {
    this.unbanForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          valueEqualValidator(this.user.username),
        ],
      ),
    });
  }

  public async unbanUser(): Promise<void> {
    this.submitted = true;

    try {
      await this.rmcaService.unBanUser(this.user._id);
      this.noticeService.success('解封用户成功', `解封 ${this.user.username} 用户成功`);
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '找不到这个用户',
      };
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('解封用户失败', errorMessage);
      console.error(error);
    }
  }
}
