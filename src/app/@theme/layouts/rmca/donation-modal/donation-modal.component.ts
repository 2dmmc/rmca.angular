import {Component} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-donation-modal',
  styleUrls: ['donation-modal.layout.scss'],
  templateUrl: 'donation-modal.component.html',
})

export class DonationModalComponent {
  constructor(public activeModal: NgbActiveModal) {
  }
}
