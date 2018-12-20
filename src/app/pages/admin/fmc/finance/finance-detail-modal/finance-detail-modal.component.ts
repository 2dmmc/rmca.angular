import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {FmcService} from '../../../../../@core/data/fmc.service';
import {DashboardService} from '../../../../dashboard/dashboard.service';

import {
  FinanceType,
  IFinanceRequest,
  IFinanceResponse,
} from '../../../../../@model/common/admin/fmc/finacne/finance.interface';

import * as moment from 'moment';

@Component({
  styleUrls: ['./finance-detail-modal.component.scss'],
  templateUrl: './finance-detail-modal.component.html',
})

export class FinanceDetailModalComponent implements OnInit {
  @Input() financeHistory: IFinanceResponse;
  @Output() event = new EventEmitter();

  public financeHistoryForm: FormGroup;
  public submitted: boolean;

  public FinanceType = FinanceType;

  constructor(private noticeService: NoticeService,
              public activeModal: NgbActiveModal,
              private fmcService: FmcService,
              private dashboardService: DashboardService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.financeHistoryForm = new FormGroup({
      date: new FormControl(
        '',
      ),
      type: new FormControl(
        '',
      ),
      accrual: new FormControl(
        '',
      ),
      comment: new FormControl(
        '',
      ),
      userId: new FormControl(
        '',
      ),
    });

    this.getServer(this.financeHistory._id);
  }

  private async getServer(id: string): Promise<void> {
    this.submitted = true;

    try {
      const financeHistory = await this.dashboardService.getFinanceHistory(id);

      this.financeHistoryForm.patchValue({
        date: moment(financeHistory.date).format('YYYY-MM-DD'),
        type: financeHistory.type,
        accrual: ((financeHistory.accrual / 100).toFixed(2)),
        comment: financeHistory.comment,
        user: financeHistory.user,
      });

      // TODO 针对空User的Hack处理, 不太优雅
      if (financeHistory.user) {
        this.financeHistoryForm.patchValue({
          userId: financeHistory.user._id,
        });
      }
    } catch (error) {
      const errorMessageMap = {};
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('获取财务历史失败', errorMessage);
      console.error(error);
    }

    this.submitted = false;
  }

  public async updateFinanceHistory(financeForm: IFinanceRequest): Promise<void> {
    this.submitted = true;

    try {
      await this.fmcService.updateFinanceHistory(this.financeHistory._id, financeForm);
      this.noticeService.success('更新成功', '更新财务历史记录成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {};
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('更新财务历史记录失败', errorMessage);
      console.error(error);
    }

    this.submitted = false;
  }
}
