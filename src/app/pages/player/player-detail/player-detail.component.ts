import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-detail',
  styleUrls: ['./player-detail.component.scss'],
  templateUrl: './player-detail.component.html',
})

export class PlayerDetailComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService) {
  }

  ngOnInit() {

  }
}
