import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DonationModalComponent} from './donation-modal/donation-modal.component';

@Component({
  selector: 'ngx-rmca-layout',
  styleUrls: ['./rmca.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                  tag="menu-sidebar"
                  responsive
      >
        <nb-sidebar-header>
          <button (click)="showDonationModal()" class="btn btn-hero-success main-btn">
            <!-- TODO 把字改成实时的欠款金额 -->
            <i class="ion ion-social-yen"></i> <span>穷!</span>
          </button>
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class RmcaLayoutComponent {
  constructor(private modalService: NgbModal) {
  }

  showDonationModal(): void {
    this.modalService.open(DonationModalComponent, {size: 'lg', container: 'nb-layout'});
  }
}
