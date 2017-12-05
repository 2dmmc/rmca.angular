import {AfterViewInit, Component, OnInit} from '@angular/core';

import {DashboardService} from '../dashboard.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-finance-history',
  styleUrls: ['./finance-history.component.scss'],
  templateUrl: './finance-history.component.html',
})
export class FinanceHistoryComponent implements OnInit, AfterViewInit {
  constructor(private dashboardService: DashboardService,
              private noticeService: NoticeService) {
  }

  financeHistories: any;
  page: number;
  pageArray: number[];

  ngOnInit(): void {
    this.financeHistories = [];
    this.page = 1;
    this.pageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngAfterViewInit(): void {
    this.getFinanceHistories(this.page);
  }

  getFinanceHistories(page): void {
    this.dashboardService.getFinanceHistories(page)
      .then(financeHistory => {
        this.financeHistories = financeHistory;
      })
      .catch(error => {
        this.noticeService.error('获取捐助记录失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  _pageEvent(event): void {
    this.financeHistories = [];
    this.getFinanceHistories(event);
  }
}
