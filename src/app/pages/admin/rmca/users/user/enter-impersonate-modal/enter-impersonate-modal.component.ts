import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../../@core/services/notice.service';
import {RmcaService} from '../../../rmca.service';

import {IUserExtend} from '../../../../../../@model/common/user/user.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {valueEqualValidator} from '../../../../../../@core/directives/index';
import {NoticeUtilService} from '../../../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./enter-impersonate-modal.component.scss'],
  templateUrl: './enter-impersonate-modal.component.html',
})

export class EnterImpersonateModalComponent implements OnInit {
  @Input() user: IUserExtend;
  @Output() event = new EventEmitter();
  public submitted: boolean;
  public impersonateForm: FormGroup;

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public activeModal: NgbActiveModal,
              private rmcaService: RmcaService,
              private router: Router) {
    this.submitted = false;
  }

  public async ngOnInit() {
    this.impersonateForm = new FormGroup({
      username: new FormControl(
        '', [
          Validators.required,
          valueEqualValidator(this.user.username),
        ],
      ),
    });
  }

  public async enterImpersonate(): Promise<void> {
    this.submitted = true;

    try {
      await this.rmcaService.enterImpersonate(this.user._id);
      this.noticeService.success(
        '替身登录成功',
        `替身登录 ${this.user.username} 成功, 即将装弹`,
      );
      setTimeout(() => {
        this.router.navigate(['/pages/dashboard'])
          .then(navagateState => {
            window.location.reload();
          });
      }, 3e3);
    } catch (error) {
      const errorMessageMap = {
        409: '你当前已经处于替身模式下',
      };
      this.noticeUtilService.errorNotice(error, '替身登录失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
