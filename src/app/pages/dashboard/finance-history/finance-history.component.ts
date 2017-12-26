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
  limit: number;

  constructor(private noticeService: NoticeService,
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
        this.financeHistories = financeHistory;
      })
      .catch(error => {
        this.noticeService.error('获取捐助记录失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  public pageAdd(): void {
    this.page++;
    this.pageChange(this.page);
  }

  public pageKeyDown(event): void {
    if (event.keyCode == 13) {
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
}
