import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  constructor(private noticeService: NoticeService) {
  }

  public ngOnInit(): void {

  }
}
