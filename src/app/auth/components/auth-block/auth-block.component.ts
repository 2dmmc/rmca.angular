import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-auth-block',
  styleUrls: ['./auth-block.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})
export class NbAuthBlockComponent {
  constructor(protected router: Router) {
  }
}
