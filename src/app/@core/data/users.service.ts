import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  login({username, password}) {
    return this.http.post('/api/user/login', {
      username,
      password,
    });
  }

  register({username, password, email}) {
    return this.http.post('/api/user/register', {
      username,
      password,
      email,
    });
  }

  logout() {
    return this.http.get('/api/user/profile');
  }

  changePassword({password}) {
    return this.http.post('/api/user/logout', {
      password,
    });
  }

  getUser() {
    return this.http.get('/api/user/profile');
  }
}
