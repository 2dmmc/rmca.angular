import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username, password, isKeepLogin) {
    return this.http.post('/api/user/login', {
      username,
      password,
      isKeepLogin,
    })
      .toPromise();
  }

  logout() {
    return this.http.get('/api/user/logout')
      .toPromise();
  }

  register(username, password, email) {
    return this.http.post('/api/user/register', {
      username,
      password,
      email,
    })
      .toPromise();
  }

  requestPass(email) {
    return this.http.post('/api/user/reset', {
      email,
    })
      .toPromise();
  }

  resetPassword(hash, password) {
    return this.http.post(`/api/user/reset/${hash}`, {
      password,
    })
      .toPromise();
  }

  checkHash(hash) {
    return this.http.get(`/api/user/reset/${hash}`)
      .toPromise();
  }

  checkLoginState() {
    return this.http.get('/api/user/login')
      .toPromise();
  }
}
