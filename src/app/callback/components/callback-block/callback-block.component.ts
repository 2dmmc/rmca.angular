import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-callback-block',
  styleUrls: ['./callback-block.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})
export class CallbackBlockComponent {
  constructor(protected router: Router) {
  }
}
