import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CallbackService {
  constructor(private http: HttpClient) {
  }

  oauthQQCallback(accessToken: string, expiresIn: string): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn);

    return this.http.get('/api/social/bind/qq', {params: params})
      .toPromise();
  }

  oauthWeiboCallback(accessToken: string, expiresIn: string): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn);

    return this.http.get('/api/social/bind/weibo', {params: params})
      .toPromise();
  }

  loginQQCallback(accessToken: string, expiresIn: string, uid: string): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn)
      .set('uid', uid);

    return this.http.get('/api/user/login/callback/qq', {params: params})
      .toPromise();
  }

  loginWeiboCallback(accessToken: string, expiresIn: string, uid: string): Promise<object> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('expiresIn', expiresIn)
      .set('uid', uid);

    return this.http.get('/api/user/login/callback/weibo', {params: params})
      .toPromise();
  }
}
