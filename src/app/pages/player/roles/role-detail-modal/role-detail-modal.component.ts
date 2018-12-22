import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';

import {NoticeService} from '../../../../@core/services/notice.service';

import {PlayerService} from '../../../../@core/data/player.service';

import {IRole} from '../../../../@model/common/player/role/role.interface';
import {AuthUtilService} from '../../../../@core/utils/auth-util.service';
import {IAnimationOptions, IOrbitControlsOptions, ISkin, ISkinViewerOptions} from '../../../../@theme/components';
import {isSlimSkin} from 'skinview3d';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

interface ISkinFile {
  skin: File;
  cape: File;
}

enum SkinType {
  upload,
  async,
}

@Component({
  styleUrls: ['./role-detail-modal.component.scss'],
  templateUrl: './role-detail-modal.component.html',
})

export class RoleDetailModalComponent implements OnInit {
  @Input() role: IRole;
  @Output() event = new EventEmitter();

  public skinViewerInitOptions: {
    skin: ISkin,
    skinViewerOptions: ISkinViewerOptions,
    animationOptions: IAnimationOptions,
    controlOptions: IOrbitControlsOptions,
  };

  public roleForm: FormGroup;
  public submitted: boolean;

  public SkinType = SkinType;
  public skinType: SkinType;
  public skinFile: ISkinFile;
  public previewSkin: ISkin;

  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private noticeUtilService: NoticeUtilService,
              public authUtilService: AuthUtilService,
              public activeModal: NgbActiveModal) {
    this.submitted = false;
    this.skinType = SkinType.upload;
    this.previewSkin = {
      skinSrc: '',
      capeSrc: '',
    };
    this.skinFile = {
      skin: null,
      cape: null,
    };
    this.skinViewerInitOptions = {
      skin: {
        skinSrc: '',
        capeSrc: '',
      },
      animationOptions: {
        rotating: true,
        running: true,
      },
      controlOptions: {
        rotate: true,
        zoom: true,
      },
      skinViewerOptions: {
        height: 275,
        width: 275,
      },
    };
  }


  public ngOnInit(): void {
    this.roleForm = new FormGroup({});
    this.previewSkin = {
      skinSrc: this.role.skin,
      capeSrc: this.role.cape,
    };
  }

  public async skinTypeEventHandler(skinType: SkinType) {
    switch (skinType) {
      case SkinType.upload:
        this.previewSkin = {
          skinSrc: await this.file2base64(this.skinFile.skin) || this.role.skin,
          capeSrc: await this.file2base64(this.skinFile.cape) || this.role.cape,
        };
        break;
      case SkinType.async:
        this.previewSkin = {
          skinSrc: '/api/yggdrasil/skin',
          capeSrc: '/api/yggdrasil/cape',
        };
        break;
    }
  }

  public async getFiles(event, type): Promise<void> {
    if (event.srcElement) {
      const files = event.srcElement.files;

      if (files.length > 0) {
        switch (type) {
          case 'skin': {
            this.skinFile.skin = files[0];
            this.previewSkin = {
              skinSrc: await this.file2base64(files[0]) || this.previewSkin.skinSrc,
              capeSrc: this.previewSkin.capeSrc,
            };
            break;
          }
          case 'cape': {
            this.skinFile.cape = files[0];
            this.previewSkin = {
              skinSrc: this.previewSkin.skinSrc,
              capeSrc: await this.file2base64(files[0]) || this.previewSkin.capeSrc,
            };
            break;
          }
          default: {
            console.warn('getFiles type is default');
          }
        }
      }
    }
  }

  public async updateRole(): Promise<void> {
    this.submitted = true;

    try {
      if (this.skinFile.skin) {
        await this.playerService.updateRoleSkin(
          this.role._id,
          await this.getImageModel(this.skinFile.skin),
          this.skinFile.skin);
      }
      if (this.skinFile.cape) {
        await this.playerService.updateRoleCape(this.role._id, this.skinFile.cape);
      }

      this.noticeService.success('更新成功', '更新角色详情成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        415: '图片格式不符, 请上传png',
      };
      this.noticeUtilService.errorNotice(error, '更新角色详情失败', errorMessageMap);
    }

    this.submitted = false;
  }

  public async updateYggdrasilSkin(roleId): Promise<void> {
    this.submitted = true;

    try {
      await this.playerService.updateYggdrasilSkin(roleId);
      this.noticeService.success('同步成功', '同步正版皮肤成功');
      this.event.emit();
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        404: '角色不存在',
        406: '你还没有进行正版验证',
        550: '服务器找不见这个uuid，理论上应该不会有这个情况',
        551: '你的正版账号还没设置皮肤',
      };
      this.noticeUtilService.errorNotice(error, '同步正版皮肤失败', errorMessageMap);
    }

    this.submitted = false;
  }

  private async file2base64(file: File): Promise<string> {
    if (!file) {
      return;
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event => {
        resolve(reader.result);
      });
      reader.onerror = (error => {
        reject(error);
      });
    });
  }

  private async getImageModel(file: File): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const image = new Image();
      image.src = await this.file2base64(file);
      image.onload = (ev => {
        if (isSlimSkin(image)) {
          resolve('alex');
        } else {
          resolve('steve');
        }
      });
      image.onerror = ev => {
        console.warn('check image model fail, use default model');
        resolve('steve');
      };
    });
  }
}
