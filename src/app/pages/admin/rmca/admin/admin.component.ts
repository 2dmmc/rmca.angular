import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})

export class AdminComponent implements OnInit {
  constructor(private noticeService: NoticeService) {
  }

  public ngOnInit(): void {

  }
}
