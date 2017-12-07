import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'ngx-history',
  styleUrls: ['./history.component.scss'],
  templateUrl: './history.component.html',
})

export class HistoryComponent implements OnInit {
  constructor(private noticeService: NoticeService,
              private managerService: AdminService) {
  }

  public ngOnInit(): void {

  }
}
