import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../../@core/services/notice.service';
import {RmcaService} from '../../../rmca.service';

import {IUser} from '../../../../../../@model/common/user/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {valueEqualValidator} from '../../../../../../@core/directives/index';

@Component({
  styleUrls: ['./admin-revoke-modal.component.scss'],
  templateUrl: './admin-revoke-modal.component.html',
})

export class AdminRevokeModalComponent implements OnInit {
  @Input() user: IUser;
  @Output() event = new EventEmitter();
  public submitted: boolean;
  public adminRevokeForm: FormGroup;

  constructor(private noticeService: NoticeService,
              public activeModal: NgbActiveModal,
              private rmcaService: RmcaService) {
    this.submitted = false;
  }

  public async ngOnInit() {
    this.adminRevokeForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          valueEqualValidator(this.user.username),
        ],
      ),
    });
  }

  public async revokeAdmin(): Promise<void> {
    this.submitted = true;

    try {
      await this.rmcaService.revokeAdmin(this.user._id);
      this.noticeService.success(
        '撤销管理员成功',
        `撤销 ${this.user.username} 管理员成功`,
      );
      this.event.emit();
      this.activeModal.close();
    } catch (e) {
      const errorMessageMap = {
        404: '找不到这个用户',
      };
      const errorMessage = errorMessageMap[e.status] || `[${e.status}] ${e.message}`;
      this.noticeService.error(
        '授予管理员失败',
        errorMessage,
      );
    }

    this.submitted = false;
  }
}
