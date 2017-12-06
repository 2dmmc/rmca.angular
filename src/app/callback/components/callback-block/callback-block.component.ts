import {Component} from '@angular/core';

@Component({
  selector: 'ngx-callback-block',
  styleUrls: ['./callback-block.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})

export class CallbackBlockComponent {
  constructor() {
  }
}
