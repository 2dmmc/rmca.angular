import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@system/notice/notice.service';
import {ServerService} from '../../server.service';

import {Finance} from '../../../../../@model/admin/server/finacne/finance.interface';

@Component({
  styleUrls: ['./finance-detail-modal.component.scss'],
  templateUrl: './finance-detail-modal.component.html',
})

export class FinanceDetailModalComponent {
  @Input() financeHistory: any;
  @Output() event = new EventEmitter();
  finance: Finance;
  submitted: boolean;

  // TODO check financeType enum
  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private adminService: ServerService) {
    this.financeHistory = {
      date: null,
      type: 'income',
      accrual: null,
      comment: '',
    };
    this.submitted = false;
  }

  public updateFinanceHistory(): void {
    this.submitted = true;

    // this.adminService.addFinance(this.finance)
    //   .then(createState => {
    //     this.noticeService.success('新增成功', '新增财务历史记录成功');
    //     this.event.emit();
    //     this.activeModal.close();
    //   })
    //   .catch(error => {
    //     this.submitted = false;
    //
    //     let errorMessage = '';
    //
    //     switch (error.status) {
    //       default: {
    //         errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
    //       }
    //     }
    //
    //     this.noticeService.error('新增财务历史记录失败', errorMessage);
    //   });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
