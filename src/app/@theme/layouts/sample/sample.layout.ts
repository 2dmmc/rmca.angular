import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, OnDestroy} from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import {DonationModalComponent} from './donation-modal/donation-modal.component';

import {StateService} from '../../../@core/data/state.service';

import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  templateUrl: 'sample.layout.html',
})

export class SampleLayoutComponent implements OnDestroy {

  subMenu: NbMenuItem[] = [
    {
      title: '二级菜单',
      group: true,
    },
    {
      title: '二级菜单懒得做了, 就这样',
      icon: 'fa fa-steam-square ',
      link: '#',
    },
  ];

  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;
  protected menuClick$: Subscription;

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              private modalService: NgbModal) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuClick$ = this.menuService.onItemSelect()
      .withLatestFrom(this.themeService.onMediaQueryChange())
      .delay(20)
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });
  }

  showDonationModal(): void {
    this.modalService.open(DonationModalComponent, {size: 'lg', container: 'nb-layout'});
  }

  ngOnDestroy(): void {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
    this.menuClick$.unsubscribe();
  }
}
