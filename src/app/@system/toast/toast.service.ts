import {Injectable} from '@angular/core';
import {BodyOutputType, Toast, ToasterService} from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Injectable()
export class ToastService {
  constructor(private toasterService: ToasterService) {
  }

  public success(title, body) {
    const toast: Toast = {
      type: 'success',
      title: title,
      body: body,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.toasterService.popAsync(toast);
  }

  public warning(title, body) {
    const toast: Toast = {
      type: 'warning',
      title: title,
      body: body,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.toasterService.popAsync(toast);
  }

  public info(title, body) {
    const toast: Toast = {
      type: 'info',
      title: title,
      body: body,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };

    this.toasterService.popAsync(toast);
  }

  public error(title, body) {
    const toast: Toast = {
      type: 'error',
      title: title,
      body: body,
      bodyOutputType: BodyOutputType.TrustedHtml,
      timeout: 8000,
    };

    this.toasterService.popAsync(toast);
  }
}
