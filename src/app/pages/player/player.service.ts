import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  getRoles() {
    return this.http.get('/api/role')
      .toPromise();
  }

  addRole(rolename) {
    const params = new HttpParams()
      .set('rolename', rolename);

    return this.http.post('/api/role', params)
      .toPromise();
  }

  getRoleSkin(roleId) {
    return this.http.get(`/api/role/skin/${roleId}`)
      .toPromise();
  }

  getRole(roleId) {
    return this.http.get(`/api/role/${roleId}`)
      .toPromise();
  }

  updateRole(roleId, skinModel, skin) {
    const params = new HttpParams()
      .set('model', skinModel)
      .set('file', skin);

    return this.http.post(`/api/role/skin/${roleId}`, params)
      .toPromise();
  }

  updateDefaultRole(roleId) {
    const params = new HttpParams()
      .set('roleId', roleId);

    return this.http.patch('/api/role/default', params)
      .toPromise();
  }
}
