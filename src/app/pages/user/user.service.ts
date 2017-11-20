import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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
    const params = new HttpParams()
      .set(email, email);

    return this.http.post('/api/user/profile', params)
      .toPromise();
  }

  updateUserPassword(password, newPassword) {
    const params = new HttpParams()
      .set(password, password)
      .set(newPassword, newPassword);

    return this.http.post('/api/user/password', params)
      .toPromise();
  }
}
