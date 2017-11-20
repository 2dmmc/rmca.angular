/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'ngx-rmca-app',
  template: `
    <toaster-container [toasterconfig]="toasterConfig"></toaster-container>
    <router-outlet></router-outlet>
  `,
})

export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  public toasterConfig: ToasterConfig =
    new ToasterConfig({
      positionClass: 'toast-bottom-right',
      timeout: 3e3,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: 'flyRight',
      limit: 0,
    });
}
