import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-social-qq-state',
  styleUrls: ['./social-QQ-state.component.scss'],
  templateUrl: './social-QQ-state.component.html',
})
export class SocialQQStateComponent {
  constructor() {
  }

  @Input() user: any;

  oAuth(): void {
    window.location.href = `https://auth.bangbang93.com/qq/oauth?callbackUrl=${window.location.origin}/callback/oauth/qq`;
  }
}
