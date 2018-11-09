import {AfterViewInit, Component, Input} from '@angular/core';
import {CompositeAnimation, createOrbitControls, RotatingAnimation, SkinViewer, WalkingAnimation} from 'skinview3d';

import {IRole} from '../../../../@model/common/player/role/role.interface';

@Component({
  selector: 'ngx-skin-viewer',
  styleUrls: ['./skin-viewer.component.scss'],
  templateUrl: './skin-viewer.component.html',
})

export class SkinViewerComponent implements AfterViewInit {
  @Input() role: IRole;
  random: string;

  constructor() {
    this.random = Math.random().toString(36).substr(2);
  }

  public ngAfterViewInit(): void {
    const animation = new CompositeAnimation();
    animation.add(WalkingAnimation);
    animation.add(RotatingAnimation);

    const skinViewer = new SkinViewer({
      domElement: document.getElementById(this.random),
      skinUrl: this.role.skin,
      capeUrl: this.role.cape,
      animation: animation,
    });

    const control = createOrbitControls(skinViewer);
    control.enableRotate = true;
    control.enableZoom = true;

    skinViewer.setSize(275, 275);
  }
}
