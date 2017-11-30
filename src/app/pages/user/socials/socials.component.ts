import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {NoticeService} from '../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-socials',
  styleUrls: ['./socials.component.scss'],
  templateUrl: './socials.component.html',
})
export class SocialsComponent implements OnInit {
  constructor(private userService: UserService,
              private noticeService: NoticeService) {
  }

  ngOnInit() {


  }

}
