import {Injectable} from '@angular/core';
import {NoticeService} from '../services/notice.service';

@Injectable()
export class NoticeUtilService {
  constructor(
    private noticeService: NoticeService) {
  }

  public errorNotice(error: any, action: string, errorMessageMap?: Object) {
    if (!errorMessageMap) {
      errorMessageMap = {};
    }
    const errorMessage = errorMessageMap[error.status] || `[${error.status}] ${error.error.message}`;
    this.noticeService.error(action, errorMessage);
    console.error(error);
  }
}
