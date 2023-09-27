import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../../@core/services/notice.service';
import {RmcaService} from '../../../rmca.service';

import {IUserExtend} from '../../../../../../@model/common/user/user.interface';
import {valueEqualValidator} from '../../../../../../@core/directives/index';
import {NoticeUtilService} from '../../../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./admin-grant-modal.component.scss'],
  templateUrl: './admin-grant-modal.component.html',
})

export class AdminGrantModalComponent implements OnInit {
  @Input() user: IUserExtend;
  @Output() event = new EventEmitter();
  public submitted: boolean;
  public adminGrantForm: FormGroup;

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.submitted = false;
  }

  public async ngOnInit() {
    this.adminGrantForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          valueEqualValidator(this.user.username),
        ],
      ),
    });
  }

  public async grantAdmin(): Promise<void> {
    this.submitted = true;

    try {
      await this.rmcaService.grantAdmin(this.user._id);
      this.noticeService.success(
        '授予管理员成功',
        `授予 ${this.user.username} 管理员成功`,
      );
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '找不到这个用户',
      };
      this.noticeUtilService.errorNotice(error, '授予管理员失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
