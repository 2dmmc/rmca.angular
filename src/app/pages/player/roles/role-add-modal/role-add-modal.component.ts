import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../../../../@core/data/player.service';
import {NoticeService} from '../../../../@core/services/notice.service';
import {NoticeUtilService} from '../../../../@core/utils/notice-util.service';

@Component({
  styleUrls: ['./role-add-modal.component.scss'],
  templateUrl: './role-add-modal.component.html',
})

export class RoleAddModalComponent implements OnInit {
  @Output() event = new EventEmitter();

  public roleForm: FormGroup;
  public submitted: boolean;

  constructor(private noticeUtilService: NoticeUtilService,
              private noticeService: NoticeService,
              private playerService: PlayerService,
              public activeModal: NgbActiveModal) {
    this.submitted = false;
  }

  public ngOnInit(): void {
    this.roleForm = new FormGroup({
      rolename: new FormControl(
        '', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_-]{1,16}$'),
        ],
      ),
    });
  }

  public async addRole(roleForm: any): Promise<void> {
    this.submitted = true;

    try {
      await this.playerService.addRole(roleForm.rolename);
      this.noticeService.success(
        '新增成功',
        '新增角色成功',
      );
      this.event.emit(roleForm);
      this.activeModal.close();
    } catch (error) {
      const errorMessageMap = {
        409: '角色名已存在',
        450: '当前角色数量超过用户账号限制',
      };
      this.noticeUtilService.errorNotice(error, '新增角色失败', errorMessageMap);
    }

    this.submitted = false;
  }
}
