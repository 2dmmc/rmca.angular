import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {ServerService} from '../../server.service';

import {IFinance} from '../../../../../@model/admin/server/finacne/finance.interface';
import {FinanceTypeEnum} from '../../../../../@model/admin/server/finacne/finance-type.enum';

@Component({
  styleUrls: ['./finance-detail-modal.component.scss'],
  templateUrl: './finance-detail-modal.component.html',
})

export class FinanceDetailModalComponent {
  @Input() financeHistory: IFinance;
  @Output() event = new EventEmitter();
  financeType = FinanceTypeEnum;
  submitted: boolean;

  constructor(private noticeService: NoticeService,
              private activeModal: NgbActiveModal,
              private adminService: ServerService) {
    this.submitted = false;
  }

  public updateFinanceHistory(financeForm): void {
    this.submitted = true;

    this.adminService.updateFinanceHistory(financeForm.comment, financeForm.userId, this.financeHistory._id)
      .then(createState => {
        this.noticeService.success('更新成功', '更新财务历史记录成功');
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

        this.noticeService.error('更新财务历史记录失败', errorMessage);
      });
  }

  public closeModal(): void {
    this.activeModal.close();
  }
}
