import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DonationModalComponent} from './donation-modal/donation-modal.component';
import {IAnimationOptions, IOrbitControlsOptions, ISkin, ISkinViewerOptions} from '../../components';

@Component({
  selector: 'ngx-rmca-layout',
  styleUrls: ['./rmca.layout.scss'],
  templateUrl: './rmca.layout.html',
})
export class RmcaLayoutComponent {
  public skinViewerInitOptions: {
    skin: ISkin,
    skinViewerOptions: ISkinViewerOptions,
    animationOptions: IAnimationOptions,
    controlOptions: IOrbitControlsOptions,
  };

  constructor(private modalService: NgbModal) {
    this.skinViewerInitOptions = {
      skin: {
        skinSrc: '/api/fun/random/skin',
        capeSrc: '',
      },
      animationOptions: {
        walking: true,
        rotating: true,
      },
      controlOptions: {
        rotate: true,
      },
      skinViewerOptions: {
        height: 175,
        width: 175,
      },
    };
  }

  showDonationModal(): void {
    this.modalService.open(DonationModalComponent, {size: 'lg', container: 'nb-layout'});
  }
}
