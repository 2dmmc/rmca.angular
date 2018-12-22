import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../../@core/services/notice.service';
import {RmcaService} from '../../../rmca.service';

import {IUser} from '../../../../../../@model/common/user/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NoticeUtilService} from '../../../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./user-ban-modal.component.scss'],
  templateUrl: './user-ban-modal.component.html',
})

export class UserBanModalComponent implements OnInit {
  @Input() user: IUser;
  @Output() event = new EventEmitter();
  public submitted: boolean;
  public banForm: FormGroup;

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.submitted = false;
  }

  public async ngOnInit() {
    this.banForm = new FormGroup({
      reason: new FormControl(
        '', [
          Validators.required,
        ],
      ),
    });
  }

  public async banUser(adminForm): Promise<void> {
    this.submitted = true;

    try {
      await this.rmcaService.banUser(this.user._id, adminForm.reason);
      this.noticeService.success(
        '封禁用户成功',
        `封禁 ${this.user.username} 用户成功`,
      );
      this.event.emit(adminForm.reason);
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '找不到这个用户',
      };
      this.noticeUtilService.errorNotice(error, '封禁用户失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
