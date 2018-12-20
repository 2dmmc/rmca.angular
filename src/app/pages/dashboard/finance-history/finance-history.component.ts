import {Component, OnInit} from '@angular/core';

import {DashboardService} from '../dashboard.service';
import {NoticeService} from '../../../@core/services/notice.service';

import {FinanceType, IFinanceResponse} from '../../../@model/common/admin/fmc/finacne/finance.interface';

@Component({
  selector: 'ngx-finance-history',
  styleUrls: ['./finance-history.component.scss'],
  templateUrl: './finance-history.component.html',
})

export class FinanceHistoryComponent implements OnInit {
  public financeHistories: IFinanceResponse[];
  public pages: number;
  public limit: number;
  public count: number;

  public FinanceType = FinanceType;

  public loading: boolean;

  constructor(private noticeService: NoticeService,
              private dashboardService: DashboardService) {
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
      const errorMessageMap = {};
      const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
      this.noticeService.error('获取捐助记录失败', errorMessage);
      console.error(error);
    }

    this.loading = false;
  }
}
