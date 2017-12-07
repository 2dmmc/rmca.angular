import {Component, EventEmitter, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@system/notice/notice.service';
import {AdminService} from '../../../admin.service';

import {FinanceModel} from '../finance.model';

@Component({
  selector: 'ngx-finance-add-modal',
  styleUrls: ['./finance-add-modal.component.scss'],
  templateUrl: './finance-add-modal.component.html',
})

export class FinanceAddModalComponent {
  @Output() event = new EventEmitter();
  finance: FinanceModel;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private adminService: AdminService) {
    this.finance = {
      date: '',
      type: 'income',
      accrual: 0,
      comment: '',
    };
    this.submitted = false;
  }

  public addServer(): void {
    this.submitted = true;

    this.adminService.addFinance(this.finance)
      .then(createState => {
        this.noticeService.success('新增成功', '新增财务历史记录成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('新增财务历史记录失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
