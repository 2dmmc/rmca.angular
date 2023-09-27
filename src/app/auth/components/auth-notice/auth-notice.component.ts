import {Component} from '@angular/core';

interface INoticeConfig {
  type: 'info' | 'success' | 'danger';
  title: string;
  message: string;
}

@Component({
  selector: 'ngx-auth-notice',
  styleUrls: ['./auth-notice.component.scss'],
  template: `
    <div class="alert alert-info" role="alert"
         [class.alert-info]="noticeConfig.type == 'info'"
         [class.alert-success]="noticeConfig.type == 'success'"
         [class.alert-danger]="noticeConfig.type == 'danger'"
         *ngIf="noticeConfig">
      <div><strong>{{noticeConfig.title}}</strong></div>
      <div>{{noticeConfig.message}}</div>
    </div>
  `,
})

export class AuthNoticeComponent {
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
