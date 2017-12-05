import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../../player.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-role-add-modal',
  styleUrls: ['./role-add-modal.component.scss'],
  templateUrl: './role-add-modal.component.html',
})

export class RoleAddModalComponent implements OnInit, AfterViewInit {
  @Output() event = new EventEmitter();

  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private activeModal: NgbActiveModal) {
  }

  role: any;
  submitted: boolean;

  ngOnInit(): void {
    this.role = {
      rolename: '',
    };
    this.submitted = false;
  }

  ngAfterViewInit(): void {

  }

  addRole(): void {
    this.playerService.addRole(this.role.rolename)
      .then(createState => {
        this.noticeService.success('创建成功', '添加角色成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 409: {
            errorMessage = '角色名已存在';
            break;
          }
          case 450: {
            errorMessage = '当前角色数量超过用户账号限制';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('添加角色失败', errorMessage);
      });
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
