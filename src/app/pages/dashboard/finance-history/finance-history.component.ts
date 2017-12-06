import {Component, OnInit} from '@angular/core';

import {DashboardService} from '../dashboard.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-finance-history',
  styleUrls: ['./finance-history.component.scss'],
  templateUrl: './finance-history.component.html',
})

export class FinanceHistoryComponent implements OnInit {
  financeHistories: any;
  page: number;
  pageArray: number[];
  limit: number;

  constructor(private noticeService: NoticeService,
              private dashboardService: DashboardService) {
    this.financeHistories = [];
    this.page = 1;
    this.pageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.limit = 13;
  }

  public ngOnInit(): void {
    this.getFinanceHistories(this.page, this.limit);
  }

  public getFinanceHistories(page, limit): void {
    this.dashboardService.getFinanceHistories(page, limit)
      .then(financeHistory => {
        this.financeHistories = financeHistory;
      })
      .catch(error => {
        this.noticeService.error('获取捐助记录失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public pageChange(page): void {
    this.getFinanceHistories(page);
  }
}
