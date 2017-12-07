import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  styleUrls: ['./admins.component.scss'],
  templateUrl: './admins.component.html',
})

export class AdminsComponent implements OnInit {
  constructor(private noticeService: NoticeService) {
  }

  public ngOnInit(): void {

  }
}
