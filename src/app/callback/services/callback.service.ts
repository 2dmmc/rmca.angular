import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CallbackService {
  constructor(private http: HttpClient) {
  }

  oauthQQCallback(accessToken, expiresIn): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn);

    return this.http.get('/api/social/bind/qq', {params: params})
      .toPromise();
  }

  oauthWeiboCallback(accessToken, expiresIn): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn);

    return this.http.get('/api/social/bind/weibo', {params: params})
      .toPromise();
  }
}
