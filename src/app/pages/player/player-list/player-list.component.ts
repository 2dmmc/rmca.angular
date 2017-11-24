import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-list',
  styleUrls: ['./player-list.component.scss'],
  templateUrl: './player-list.component.html',
})

export class PlayerListComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService) {
  }

  ngOnInit() {

  }
}
