import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-donation-modal',
  styleUrls: ['donation-modal.layout.scss'],
  templateUrl: 'donation-modal.component.html',
})

export class DonationModalComponent {
  constructor(private activeModal: NgbActiveModal,
              private router: Router) {
  }

  closeModal() {
    this.activeModal.close();
  }

  goToDashboard(): void {
    this.router.navigate(['/pages/dashboard']);
  }
}
