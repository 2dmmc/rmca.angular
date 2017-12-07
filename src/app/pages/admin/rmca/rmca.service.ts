import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RmcaService {
  constructor(private http: HttpClient) {
  }

  // TODO 补齐文档

  public getAdmins(): Promise<object> {
    return this.http.get('/api/admin/server/list')
      .toPromise();
  }

  public updateAdmin(userId: string): Promise<object> {
    return this.http.patch(`/api/admin/admin/${userId}/admin`, {})
      .toPromise();
  }

  public getUsers(): Promise<object> {
    return this.http.get('/api/admin/user/list')
      .toPromise();
  }

  public banUser(userId: string, reason: string): Promise<object> {
    const params = new HttpParams()
      .set('userIds', userId)
      .set('reason', reason);

    return this.http.patch('/api/admin/user/ban', params)
      .toPromise();
  }

  public searchUser(keyword: string, page: number): Promise<object> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString());

    return this.http.post('/api/admin/user/search', params)
      .toPromise();
  }

  public unBanUser(userId: string): Promise<object> {
    const params = new HttpParams()
      .set('userIds', userId);

    return this.http.patch('/api/admin/user/unban', params)
      .toPromise();
  }
}
