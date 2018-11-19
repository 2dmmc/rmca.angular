import {AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {
  CompositeAnimation,
  createOrbitControls,
  RotatingAnimation,
  RunningAnimation,
  SkinViewer,
  WalkingAnimation,
} from 'skinview3d';

export interface ISkin {
  skinSrc?: string;
  capeSrc?: string;
}

export interface ISkinViewerOptions {
  width: number;
  height: number;
}

export interface IAnimationOptions {
  rotating?: boolean;
  walking?: boolean;
  running?: boolean;
}

export interface IOrbitControlsOptions {
  rotate?: boolean;
  zoom?: boolean;
}

@Component({
  selector: 'ngx-skin-viewer',
  styleUrls: ['./skin-viewer.component.scss'],
  templateUrl: './skin-viewer.component.html',
})

export class SkinViewerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() skin: ISkin;
  @Input() skinViewerOptions: ISkinViewerOptions;
  @Input() animationOptions: IAnimationOptions;
  @Input() controlOptions: IOrbitControlsOptions;

  public randomId: string;
  public SkinViewer: SkinViewer;
  public loading: boolean;
  public readonly png: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6E' +
    'AAAAUElEQVRoQ+3VAREAMAwCseLfdIV85qAcGbv4W/z+E4AGxBNAIF4AnyACCMQTQCBeACuAAALxBBCIF8AKIIBAPAEE4g' +
    'WwAgggEE8AgXgBrMADMk4AIe75ViAAAAAASUVORK5CYII=';

  constructor() {
    this.randomId = Math.random().toString(36).substr(2);
    this.loading = true;
  }

  public ngOnDestroy() {
    this.SkinViewer.renderer.forceContextLoss();
    this.SkinViewer.renderer.context = null;
    this.SkinViewer.dispose();
  }

  public async ngOnChanges(changes: SimpleChanges) {
    if (!this.SkinViewer) {
      return;
    }

    await this.rerender(this.SkinViewer);

    this.loading = false;
  }

  public async ngAfterViewInit(): Promise<void> {
    this.SkinViewer = await this.createSkinView(
      this.skin,
      this.skinViewerOptions,
      this.animationOptions,
      this.controlOptions,
    );

    this.loading = false;
  }

  public async createSkinView(skin: ISkin,
                              skinViewerOptions: ISkinViewerOptions,
                              animationOptions: IAnimationOptions,
                              controlsOptions: IOrbitControlsOptions): Promise<SkinViewer> {
    const skinViewer = new SkinViewer({
      domElement: document.getElementById(this.randomId),
    });

    skinViewer.skinUrl = skin.skinSrc;
    skinViewer.capeUrl = skin.capeSrc;
    skinViewer.animation = SkinViewerComponent.createAnimation(animationOptions);
    skinViewer.detectModel = true;
    SkinViewerComponent.createOrbitControls(skinViewer, controlsOptions);
    skinViewer.setSize(skinViewerOptions.width, skinViewerOptions.height);

    return skinViewer;
  }

  public async rerender(skinViewer: SkinViewer) {
    skinViewer.renderer.context = null;
    skinViewer.dispose();
    this.SkinViewer = await this.createSkinView(
      this.skin,
      this.skinViewerOptions,
      this.animationOptions,
      this.controlOptions,
    );
  }

  private static createAnimation(options: IAnimationOptions): CompositeAnimation {
    const compositeAnimation = new CompositeAnimation();

    if (options.rotating) {
      compositeAnimation.add(RotatingAnimation);
    }
    if (options.walking) {
      compositeAnimation.add(WalkingAnimation);
    }
    if (options.running) {
      compositeAnimation.add(RunningAnimation);
    }

    return compositeAnimation;
  }

  private static createOrbitControls(skinViewer: SkinViewer, options: IOrbitControlsOptions): void {
    const control = createOrbitControls(skinViewer);

    if (options.rotate) {
      control.enableRotate = options.rotate;
    }

    if (options.zoom) {
      control.enableZoom = options.zoom;
    }
  }


  // private async loadImageToMemory(imageSrc: string) {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     const img = new Image();
  //     img.src = imageSrc;
  //     img.onload = event => {
  //       document.body.removeChild(img);
  //       resolve(imageSrc);
  //     };
  //     img.onerror = () => {
  //       document.body.removeChild(img);
  //       resolve('');
  //     };
  //     document.body.appendChild(img);
  //   });
  // }

}
