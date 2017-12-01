import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import {UserModel} from '../../user.model';

@Component({
  selector: 'ngx-social-gravatar-state',
  styleUrls: ['./social-gravatar-state.component.scss'],
  templateUrl: './social-gravatar-state.component.html',
})
export class SocialGravatarStateComponent {
  constructor(private router: Router) {
  }

  @Input() user: UserModel;

  toProfile(): void {
    this.router.navigate(['./profile']);
  }
}
