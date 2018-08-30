import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DonationModalComponent} from './donation-modal/donation-modal.component';

@Component({
  selector: 'ngx-rmca-layout',
  styleUrls: ['./rmca.layout.scss'],
  templateUrl: './rmca.layout.html',
})
export class RmcaLayoutComponent {
  constructor(private modalService: NgbModal) {
  }

  showDonationModal(): void {
    this.modalService.open(DonationModalComponent, {size: 'lg', container: 'nb-layout'});
  }
}
