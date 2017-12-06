import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-user-state',
  styleUrls: ['./user-state.component.scss'],
  templateUrl: './user-state.component.html',
})

export class UserStateComponent {
  @Input() user: any;

  constructor() {
  }
}
