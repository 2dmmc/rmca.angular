import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';

@Component({
  styleUrls: ['./finance.component.scss'],
  templateUrl: './finance.component.html',
})

export class FinanceComponent implements OnInit {
  financeHistories: any;
  page: number;
  pageArray: number[];
  limit: number;

  constructor(private noticeService: NoticeService,
              private modalService: NgbModal,
              private dashboardService: DashboardService) {
    this.financeHistories = [];
    this.page = 1;
    this.pageArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  public pageChange(page): void {
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
}
