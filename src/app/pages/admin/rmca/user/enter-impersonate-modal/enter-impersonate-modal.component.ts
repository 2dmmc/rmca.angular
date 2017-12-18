import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@system/notice/notice.service';
import {RmcaService} from '../../rmca.service';

import {User} from '../../../../../@model/user/user.interface';

@Component({
  styleUrls: ['./enter-impersonate-modal.component.scss'],
  templateUrl: './enter-impersonate-modal.component.html',
})

export class EnterImpersonateModalComponent {
  @Input() user: User;
  @Output() event = new EventEmitter();
  username: string;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private rmcaService: RmcaService,
              private router: Router) {
    this.username = null;
    this.submitted = false;
  }

  public enterImpersonate(): void {
    this.submitted = true;

    this.rmcaService.enterImpersonate(this.user._id)
      .then(enterState => {
        this.noticeService.success('替身登陆成功', `替身登陆 ${this.user.username} 成功, 即将装弹`);
        setTimeout(() => {
          this.router.navigate(['/pages/dashboard'])
            .then(navagateState => {
              window.location.reload();
            });
        }, 3e3);
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 409: {
            errorMessage = '你当前已经处于替身模式下';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('替身登录失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
