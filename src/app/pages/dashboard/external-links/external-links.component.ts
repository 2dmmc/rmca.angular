import {Component} from '@angular/core';

@Component({
  selector: 'ngx-external-links',
  styleUrls: ['./external-links.component.scss'],
  templateUrl: './external-links.component.html',
})

export class ExternalLinksComponent {
  constructor() {
  }

  public goToHome(): void {
    location.href = 'https://www.fmc.moe/';
  }

  public goToMap(): void {
    location.href = 'https://map.bangbang93.com/';
  }
}
