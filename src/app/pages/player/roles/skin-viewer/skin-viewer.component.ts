import {AfterViewInit, Component, Input} from '@angular/core';
import {
  CompositeAnimation,
  createOrbitControls,
  RotatingAnimation,
  RunningAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';

import {ISkinViewerOptions} from '../../../../@model/components/skin-viewer/options';

@Component({
  selector: 'ngx-skin-viewer',
  styleUrls: ['./skin-viewer.component.scss'],
  templateUrl: './skin-viewer.component.html',
})

export class SkinViewerComponent implements AfterViewInit {
  @Input() skinUrl: string;
  @Input() capeUrl: string;
  @Input() options?: ISkinViewerOptions;
  public random: string;

  constructor() {
    this.random = Math.random().toString(36).substr(2);
  }

  public ngAfterViewInit(): void {
    const animation = new CompositeAnimation();

    if (this.options.RotatingAnimation) {
      animation.add(RotatingAnimation);
    }
    if (this.options.WalkingAnimation) {
      animation.add(WalkingAnimation);
    }
    if (this.options.RunningAnimation) {
      animation.add(RunningAnimation);
    }

    const skinViewer = new SkinViewer({
      domElement: document.getElementById(this.random),
      skinUrl: this.skinUrl || undefined,
      capeUrl: this.capeUrl || undefined,
      animation: animation,
    });

    const control = createOrbitControls(skinViewer);
    control.enableRotate = this.options.enableRotate || true;
    control.enableZoom = this.options.enableZoom || true;

    skinViewer.setSize(this.options.width || 275, this.options.height || 275);
  }
}
