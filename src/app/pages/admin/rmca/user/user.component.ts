import {Component, OnInit} from '@angular/core';

import {NoticeService} from '../../../../@system/notice/notice.service';
import {AdminService} from '../../admin.service';

@Component({
  styleUrls: ['./user.component.scss'],
  templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
  constructor(private noticeService: NoticeService,
              private managerService: AdminService) {
  }

  public ngOnInit(): void {

  }
}
