import {Component, Input} from '@angular/core';

import {UserModel} from '../../user.model';

@Component({
  selector: 'ngx-social-weibo-state',
  styleUrls: ['./social-weibo-state.component.scss'],
  templateUrl: './social-weibo-state.component.html',
})
export class SocialWeiboStateComponent {
  constructor() {
  }

  @Input() user: UserModel;

  oAuth(): void {
    window.location.href = `https://auth.bangbang93.com/weibo/oauth?callbackUrl=${window.location.origin}/callback/oauth/weibo`;
  }
}
