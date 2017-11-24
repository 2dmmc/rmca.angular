import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../player.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-player-add',
  styleUrls: ['./player-add.component.scss'],
  templateUrl: './player-add.component.html',
})

export class PlayerAddComponent implements OnInit {
  constructor(private playerService: PlayerService,
              private noticeService: NoticeService) {
  }

  ngOnInit() {

  }
}
