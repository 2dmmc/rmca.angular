import {Component, OnDestroy} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {delay, takeWhile, withLatestFrom} from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
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
export class RmcaLayoutComponent implements OnDestroy {
  layout: any = {};
  currentTheme: string;
  private alive = true;

  constructor(protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              private modalService: NgbModal) {

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  showDonationModal(): void {
    this.modalService.open(DonationModalComponent, {size: 'lg', container: 'nb-layout'});
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
