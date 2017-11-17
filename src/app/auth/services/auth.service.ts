import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username, password, isKeepLogin) {
    return this.http.post('/api/user/login', {
      username,
      password,
      isKeepLogin,
    });
  }

  logout() {
    return this.http.get('/api/user/logout');
  }

  register(username, password, email) {
    return this.http.post('/api/user/register', {
      username,
      password,
      email,
    });
  }

  requestPass(email) {
    return this.http.post('/api/user/reset', {
      email,
    });
  }

  resetPassword(hash, password) {
    return this.http.post(`/api/user/reset/${hash}`, {
      password,
    });
  }

  checkHash(hash) {
    return this.http.get(`/api/user/reset/${hash}`);
  }
}
