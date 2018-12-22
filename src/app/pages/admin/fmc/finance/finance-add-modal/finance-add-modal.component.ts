import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {NoticeService} from '../../../../../@core/services/notice.service';
import {FmcService} from '../../../../../@core/data/fmc.service';

import {IFinanceRequest, FinanceType} from '../../../../../@model/common/admin/fmc/finacne/finance.interface';

import * as moment from 'moment';
import {NoticeUtilService} from '../../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./finance-add-modal.component.scss'],
  templateUrl: './finance-add-modal.component.html',
})

export class FinanceAddModalComponent implements OnInit {
  @Output() event = new EventEmitter();

  public financeHistoryForm: FormGroup;
  public submitted: boolean;

  public FinanceType = FinanceType;

  constructor(private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public activeModal: NgbActiveModal,
              private fmcService: FmcService) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.financeHistoryForm = new FormGroup({
      date: new FormControl(
        moment().format('YYYY-MM-DD'), [
          Validators.required,
        ],
      ),
      type: new FormControl(
        FinanceType.income, [
          Validators.required,
        ],
      ),
      accrual: new FormControl(
        null, [
          Validators.required,
          Validators.min(0.01),
        ],
      ),
      comment: new FormControl(
        '',
      ),
      userId: new FormControl(
        '',
      ),
    });
  }

  public async addFinanceHistory(financeForm: IFinanceRequest): Promise<void> {
    this.submitted = true;

    try {
      await this.fmcService.addFinanceHistory(financeForm);
      this.noticeService.success('新增成功', '新增财务历史记录成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      this.noticeUtilService.errorNotice(error, '新增财务历史记录失败');
    }

    this.submitted = false;
  }
}
