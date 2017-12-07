import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {AdminService} from '../../admin.service';

@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {
  constructor(private noticeService: NoticeService,
              private managerService: AdminService) {
  }

  public ngOnInit(): void {

  }
}
