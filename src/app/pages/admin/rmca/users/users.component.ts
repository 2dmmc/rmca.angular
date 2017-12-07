import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  constructor(private noticeService: NoticeService) {
  }

  public ngOnInit(): void {

  }
}
