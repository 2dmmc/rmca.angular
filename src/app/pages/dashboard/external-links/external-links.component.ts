import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-external-links',
  styleUrls: ['./external-links.component.scss'],
  templateUrl: './external-links.component.html',
})
export class ExternalLinksComponent {
  constructor() {
  }

  @Input() user: any;
}
