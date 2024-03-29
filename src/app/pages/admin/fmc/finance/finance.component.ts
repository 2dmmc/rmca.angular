import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {DashboardService} from '../../../dashboard/dashboard.service';

import {FinanceAddModalComponent} from './finance-add-modal/finance-add-modal.component';
import {FinanceDetailModalComponent} from './finance-detail-modal/finance-detail-modal.component';

import {FinanceType, IFinanceResponse} from '../../../../@model/common/admin/fmc/finacne/finance.interface';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./finance.component.scss'],
  templateUrl: './finance.component.html',
})

export class FinanceComponent implements OnInit {
  public financeHistories: IFinanceResponse[];
  public page: number;
  public limit: number;
  public count: number;

  public FinanceType = FinanceType;

  public loading: boolean;

  constructor(private noticeUtilService: NoticeUtilService,
              private modalService: NgbModal,
              private dashboardService: DashboardService) {
    this.financeHistories = [];
    this.page = 1;
    this.limit = 10;
    this.count = 1;
    this.loading = false;
  }

  public ngOnInit(): void {
    this.getFinanceHistories(this.page, this.limit);
  }

  public async getFinanceHistories(page: number, limit: number): Promise<void> {
    // TODO 修改page后用query记录
    this.loading = true;

    try {
      const financeHistories = await this.dashboardService.getFinanceHistories(page, limit);
      this.financeHistories = financeHistories['data'];
      this.count = financeHistories['count'];
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '获取捐助记录失败');
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
      this.page = 1;
      this.getFinanceHistories(this.page, this.limit);
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
      this.getFinanceHistories(this.page, this.limit);
    });
  }
}
