import {Injectable} from '@angular/core';
import {isSlimSkin} from 'skinview3d';

@Injectable()
export class SkinViewerService {

  constructor() {
  }

  public switch3Drender(): void {

  }

  public switch2Drender(): void {

  }

  static isSlimSkin(imageSrc: string): boolean {
    const skinImage = new Image();
    skinImage.src = imageSrc;
    return isSlimSkin(skinImage);
  }
}
