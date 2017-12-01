import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../user.model';

@Component({
  selector: 'ngx-social-qq-state',
  styleUrls: ['./social-QQ-state.component.scss'],
  templateUrl: './social-QQ-state.component.html',
})
export class SocialQQStateComponent implements OnInit {
  constructor() {
  }

  @Input() user: UserModel;

  ngOnInit(): void {
    // if (this.qq) {
    //   this.qq.isBind = true;
    // } else {
    //   this.qq = {
    //     avatar: '/images/user/sdjnmxd.jpg',
    //     name: '未绑定',
    //     isBind: false,
    //   };
    // }
    console.info(this.user);
  }

  oAuth(): void {
    window.location.href = `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/oauth/qq`;
  }
}
