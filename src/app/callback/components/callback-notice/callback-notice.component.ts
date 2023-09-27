import {Component} from '@angular/core';

interface INoticeConfig {
  type: 'info' | 'success' | 'danger';
  title: string;
  message: string;
}

@Component({
  selector: 'ngx-callback-notice',
  styleUrls: ['./callback-notice.component.scss'],
  template: `
    <div class="alert alert-info" role="alert"
         [class.alert-info]="noticeConfig.type == 'info'"
         [class.alert-success]="noticeConfig.type == 'success'"
         [class.alert-danger]="noticeConfig.type == 'danger'"
         *ngIf="noticeConfig">
      <div><strong>{{noticeConfig.title}}</strong></div>
      <div>{{noticeConfig.message}}</div>
    </div>
    <button class="btn btn-block btn-danger"
            routerLink="/auth/login" *ngIf="noticeConfig.type == 'danger'">
      返回常规登录
    </button>
  `,
})

export class CallbackNoticeComponent {
  public noticeConfig: INoticeConfig;

  constructor() {
  }

  public show(type: INoticeConfig['type'], title: string, message: string) {
    this.noticeConfig = {
      type,
      title,
      message,
    };
  }
}
