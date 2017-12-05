import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PlayerService} from '../../player.service';
import {NoticeService} from '../../../../@system/notice/notice.service';

@Component({
  selector: 'ngx-role-detail-modal',
  styleUrls: ['./role-detail-modal.component.scss'],
  templateUrl: './role-detail-modal.component.html',
})

export class RoleDetailModalComponent implements OnInit, AfterViewInit {
  @Input() roleId;
  @Output() event = new EventEmitter();

  constructor(private playerService: PlayerService,
              private noticeService: NoticeService,
              private activeModal: NgbActiveModal) {
  }

  role: any;
  submitted: boolean;

  ngOnInit() {
    this.role = {
      rolename: '',
    };
    this.submitted = false;
  }

  ngAfterViewInit(): void {
    this.playerService.getRole(this.roleId)
      .then(role => {
        this.role = role;
      })
      .catch(error => {
        this.noticeService.error('获取角色详情失败, 请刷新页面重试', `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`);
      });
  }

  getFiles(event): void {
    const files = event.srcElement.files;
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(files[0]);
  }

  _handleReaderLoaded(readerEvt): void {
    const binaryString = readerEvt.target.result;
    this.role.file = btoa(binaryString);
  }

  updateRole(): void {
    this.submitted = false;

    this.playerService.updateRole(this.role._id, this.role.userModel, this.role.file)
      .then(updateState => {
        this.noticeService.success('更新成功', '更新角色详情成功');
        this.event.emit();
        this.activeModal.close();
      })
      .catch(error => {
        this.submitted = false;

        let errorMessage = '';

        switch (error.status) {
          case 415: {
            errorMessage = '图片格式不符, 请上传png';
            break;
          }
          default: {
            errorMessage = `message: ${error.error.message || '未知'} | code: ${error.status || '未知'}`;
          }
        }

        this.noticeService.error('更新角色详情失败', errorMessage);
      });
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
