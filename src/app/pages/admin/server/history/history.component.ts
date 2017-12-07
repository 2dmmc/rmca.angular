import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {ServerService} from '../server.service';

@Component({
  styleUrls: ['./history.component.scss'],
  templateUrl: './history.component.html',
})

export class HistoryComponent implements OnInit {
  constructor(private noticeService: NoticeService,
              private managerService: ServerService) {
  }

  public ngOnInit(): void {

  }
}
