import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-yggdrasil-state',
  styleUrls: ['./yggdrasil-state.component.scss'],
  templateUrl: './yggdrasil-state.component.html',
})
export class YggdrasilStateComponent {
  @Input() yggdrasil: any;

  constructor() {
  }
}
