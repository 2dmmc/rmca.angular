import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RmcaService {
  constructor(private http: HttpClient) {
  }

  // TODO 补齐文档

  public getAdmins(): Promise<object> {
    return this.http.get('/api/admin/admin/list')
      .toPromise();
  }

  public grantAdmin(userId: string): Promise<object> {
    return this.http.patch(`/api/admin/admin/${userId}/admin`, {})
      .toPromise();
  }

  public revokeAdmin(userId: string): Promise<object> {
    return this.http.delete(`/api/admin/admin/${userId}/admin`, {})
      .toPromise();
  }

  public getUsers(page: number, limit: number): Promise<object> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get('/api/admin/user/list', {params: params})
      .toPromise();
  }

  public searchUsers(keyword: string, page: number, limit: number,
                     isAdmin?: boolean, isBanned?: boolean): Promise<object> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .append('isAdmin', isAdmin.toString())
      .append('isBanned', isBanned.toString());

    return this.http.get('/api/admin/user/search', {params: params})
      .toPromise();
  }

  public getUser(userId: string): Promise<object> {
    return this.http.get(`/api/admin/user/${userId}`)
      .toPromise();
  }

  public banUser(userId: string, reason: string): Promise<object> {
    const params = new HttpParams()
      .set('userIds', userId)
      .set('reason', reason);

    return this.http.patch('/api/admin/user/ban', params)
      .toPromise();
  }

  public unBanUser(userId: string): Promise<object> {
    const params = new HttpParams()
      .set('userIds', userId);

    return this.http.patch('/api/admin/user/unban', params)
      .toPromise();
  }

  public enterImpersonate(userId: string): Promise<object> {
    return this.http.post(`/api/admin/user/${userId}/impersonate`, {})
      .toPromise();
  }
}
