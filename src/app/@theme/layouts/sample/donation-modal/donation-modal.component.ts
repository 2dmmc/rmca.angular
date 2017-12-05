import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-donation-modal',
  templateUrl: 'donation-modal.component.html',
})

export class DonationModalComponent {

  modalHeader: string;
  modalContent = `我, 萌二, 给钱`;

  constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
