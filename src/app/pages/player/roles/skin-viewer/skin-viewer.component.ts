import {AfterViewInit, Component, Input} from '@angular/core';
import * as skinview3d from '../../../../../assets/vendors/skinview3d.babel.js';

import {Role} from '../../../../@model/player/role/role.interface';

@Component({
  selector: 'rmca-skin-viewer',
  styleUrls: ['./skin-viewer.component.scss'],
  templateUrl: './skin-viewer.component.html',
})

export class SkinViewerComponent implements AfterViewInit {
  @Input() role: Role;
  random: string;

  constructor() {
    this.random = Math.random().toString(36).substr(2);
  }

  public ngAfterViewInit(): void {
    let skinViewer = new skinview3d.SkinViewer({
      domElement: document.getElementById(this.random),
      slim: this.role.userModel == 'alex',
      skinUrl: this.role.skin,
      capeUrl: this.role.cape,
      animation: skinview3d.WalkAnimation
    });

    let control = new skinview3d.SkinControl(skinViewer);
    control.enableAnimationControl = true;
  }
}
