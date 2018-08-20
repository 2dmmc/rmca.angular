import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';
import {FinanceDetailModalComponent} from './finance-detail-modal/finance-detail-modal.component';
import {IFinance} from '../../../../@model/admin/server/finacne/finance.interface';
import {FinanceTypeEnum} from '../../../../@model/admin/server/finacne/finance-type.enum';

@Component({
  styleUrls: ['./finance.component.scss'],
  templateUrl: './finance.component.html',
})

export class FinanceComponent implements OnInit {
  financeHistories: IFinance[];
  financeType = FinanceTypeEnum;
  page: number;
  pageArray: number[];
  limit: number;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private dashboardService: DashboardService) {
    this.financeHistories = [];
    this.page = 1;
    this.limit = 12;
  }

  public ngOnInit(): void {
    this.getFinanceHistories(this.page, this.limit);
  }

  public getFinanceHistories(page, limit): void {
    this.dashboardService.getFinanceHistories(page, limit)
      .then(financeHistory => {
        this.financeHistories = financeHistory as IFinance[];
      })
      .catch(error => {
        this.noticeService.error(
          '获取捐助记录失败, 请刷新页面重试',
          `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`,
        );
      });
  }

  public pageAdd(): void {
    this.page++;
    this.pageChange(this.page);
  }

  public pageKeyDown(event): void {
    if (event.keyCode === 13) {
      this.pageChange(this.page);
    }
  }

  public pageMinus(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange(this.page);
    }
  }

  private pageChange(page): void {
    this.getFinanceHistories(page, this.limit);
  }

  public openFinanceAddModal(): void {
    const activeModal = this.modalService.open(FinanceAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getFinanceHistories(this.page, this.limit);
    });
  }

  public openFinanceDetailModal(financeHistory: IFinance): void {
    const activeModal = this.modalService.open(FinanceDetailModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.financeHistory = financeHistory;
    activeModal.componentInstance.event.subscribe(() => {
      this.getFinanceHistories(this.page, this.limit);
    });
  }
}
