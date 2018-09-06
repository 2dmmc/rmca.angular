import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@core/services/notice.service';
import {DashboardService} from '../../../dashboard/dashboard.service';
import {CommonUtilService} from '../../../../@core/utils/common-util.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';
import {FinanceDetailModalComponent} from './finance-detail-modal/finance-detail-modal.component';

import {FinanceType, IFinanceResponse} from '../../../../@model/common/admin/fmc/finacne/finance.interface';

@Component({
  styleUrls: ['./finance.component.scss'],
  templateUrl: './finance.component.html',
})

export class FinanceComponent implements OnInit {
  public financeHistories: IFinanceResponse[];
  public pages: number;
  public limit: number;
  public count: number;

  public FinanceType = FinanceType;

  public loading: boolean;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private dashboardService: DashboardService,
              private commonUtilService: CommonUtilService) {
    this.financeHistories = [];
    this.pages = 1;
    this.limit = 10;
    this.count = 1;
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getFinanceHistories(this.pages, this.limit);
  }

  public async getFinanceHistories(page: number, limit: number): Promise<void> {
    this.loading = true;

    try {
      const financeHistories = await this.dashboardService.getFinanceHistories(page, limit);
      this.financeHistories = financeHistories['data'];
      this.count = financeHistories['count'];
    } catch (error) {
      this.noticeService.error('获取捐助记录失败', '获取捐助记录失败, 请刷新页面重试');
    }

    this.loading = false;
  }

  public openFinanceAddModal(): void {
    const activeModal = this.modalService.open(FinanceAddModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      backdrop: 'static',
    });

    activeModal.componentInstance.event.subscribe(() => {
      this.getFinanceHistories(1, this.limit);
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
      this.getFinanceHistories(this.pages, this.limit);
    });
  }
}
