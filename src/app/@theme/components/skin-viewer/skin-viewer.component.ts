import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  CompositeAnimation,
  createOrbitControls,
  RotatingAnimation,
  RunningAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';

import {ISkinViewerOptions} from '../../../@model/components/skin-viewer/options';

@Component({
  selector: 'ngx-skin-viewer',
  styleUrls: ['./skin-viewer.component.scss'],
  templateUrl: './skin-viewer.component.html',
})

export class SkinViewerComponent implements AfterViewInit, OnChanges {
  @Input() skinUrl: string;
  @Input() capeUrl: string;
  @Input() options?: ISkinViewerOptions;
  public randomId: string;
  public skinView: SkinViewer;
  public loading: boolean;

  constructor() {
    this.randomId = Math.random().toString(36).substr(2);
    this.loading = true;
  }

  public async ngOnChanges(changes: SimpleChanges) {
    if (this.skinView === undefined) {
      return;
    }

    if ('skinUrl' in changes) {
      await this.loadImageToMemory(changes.skinUrl.currentValue);
      this.skinView.skinUrl = changes.skinUrl.currentValue;
    }

    if ('capeUrl' in changes) {
      await this.loadImageToMemory(changes.capeUrl.currentValue);
      this.skinView.capeUrl = changes.capeUrl.currentValue;
    }

    this.loading = false;
  }

  public async ngAfterViewInit(): Promise<void> {
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

    await this.loadImageToMemory(this.skinUrl);
    await this.loadImageToMemory(this.capeUrl);

    const skinViewer = new SkinViewer({
      domElement: document.getElementById(this.randomId),
      skinUrl: this.skinUrl || '',
      capeUrl: this.capeUrl || '',
      animation: animation,
    });

    this.skinView = skinViewer;

    const control = createOrbitControls(skinViewer);
    control.enableRotate = this.options.enableRotate || true;
    control.enableZoom = this.options.enableZoom || true;

    skinViewer.setSize(this.options.width || 275, this.options.height || 275);
    this.loading = false;
  }

  public async loadImageToMemory(imageSrc: string) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = event => {
        document.body.removeChild(img);
        resolve();
      };
      img.onerror = () => {
        document.body.removeChild(img);
        resolve();
      };
      document.body.appendChild(img);
    });
  }
}
