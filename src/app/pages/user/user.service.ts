import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUserProfile() {
    return this.http.get('/api/user/profile');
  }

  updateUserProfile(email) {
    return this.http.post('/api/user/profile', {
      email,
    });
  }

  updateUserPassword(password, newPassword) {
    return this.http.post('/api/user/password', {
      password,
      newPassword,
    });
  }
}
