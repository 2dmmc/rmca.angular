import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username, password, isKeepLogin) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('isKeepLogin', isKeepLogin);

    return this.http.post('/api/user/login', params)
      .toPromise();
  }

  logout() {
    return this.http.get('/api/user/logout')
      .toPromise();
  }

  register(username, password, email) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email);

    return this.http.post('/api/user/register', params)
      .toPromise();
  }

  requestPass(email) {
    const params = new HttpParams()
      .set('email', email);

    return this.http.post('/api/user/reset', params)
      .toPromise();
  }

  resetPassword(hash, password) {
    const params = new HttpParams()
      .set('password', password);

    return this.http.post(`/api/user/reset/${hash}`, params)
      .toPromise();
  }

  checkResetPasswordHash(hash) {
    return this.http.get(`/api/user/reset/${hash}`)
      .toPromise();
  }

  getLoginState() {
    return this.http.get('/api/user/login')
      .toPromise();
  }
}
