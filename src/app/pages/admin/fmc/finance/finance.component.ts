import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';
import {FinanceDetailModalComponent} from './finance-detail-modal/finance-detail-modal.component';
import {IFinanceResponse} from '../../../../@model/common/admin/fmc/finacne/finance.interface';

@Component({
  styleUrls: ['./finance.component.scss'],
  templateUrl: './finance.component.html',
})

export class FinanceComponent implements OnInit {
  public financeHistories: IFinanceResponse[];

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private dashboardService: DashboardService) {
    this.financeHistories = [];
  }

  public ngOnInit(): void {
    this.getFinanceHistories(1, 12);
  }

  public getFinanceHistories(page, limit): void {
    this.dashboardService.getFinanceHistories(1, 12)
      .then(financeHistory => {
        this.financeHistories = financeHistory as IFinanceResponse[];
      })
      .catch(error => {
        this.noticeService.error(
          '获取捐助记录失败, 请刷新页面重试',
          `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
        );
      });
  }

  public openFinanceAddModal(): void {
    const activeModal = this.modalService.open(FinanceAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getFinanceHistories(1, 12);
    });
  }

  public openFinanceDetailModal(financeHistory: IFinanceResponse): void {
    const activeModal = this.modalService.open(FinanceDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.financeHistory = financeHistory;
    activeModal.componentInstance.event.subscribe(() => {
      this.getFinanceHistories(1, 12);
    });
  }
}
