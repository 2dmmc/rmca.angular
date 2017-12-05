import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-finance-history',
  styleUrls: ['./finance-history.component.scss'],
  templateUrl: './finance-history.component.html',
})
export class FinanceHistoryComponent {
  constructor() {
  }

  @Input() user: any;
}
