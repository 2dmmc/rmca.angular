import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserProfile() {
    return this.http.get('/api/user/profile')
      .toPromise();
  }

  updateUserProfile(email) {
    return this.http.post('/api/user/profile', {
      email,
    })
      .toPromise();
  }

  updateUserPassword(password, newPassword) {
    return this.http.post('/api/user/password', {
      password,
      newPassword,
    }).toPromise();
  }
}
