import {AfterViewInit, Component, Input} from '@angular/core';
import {RotatingAnimation, SkinViewer} from 'skinview3d';

import {Role} from '../../../../@model/player/role/role.interface';

@Component({
  selector: 'ngx-skin-viewer',
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
    const skinViewer = new SkinViewer({
      domElement: document.getElementById(this.random),
      skinUrl: this.role.skin,
      capeUrl: this.role.cape,
      animation: RotatingAnimation,
    });
  }
}
