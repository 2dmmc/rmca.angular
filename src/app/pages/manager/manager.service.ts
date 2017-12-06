import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManagerService {
  constructor(private http: HttpClient) {
  }

  public getServers(): Promise<object> {
    return this.http.get('/api/admin/server/list')
      .toPromise();
  }

  public getServer(serverId: string): Promise<object> {
    return this.http.get(`/api/admin/server/${serverId}`)
      .toPromise();
  }

  public addServer(name: string): Promise<object> {
    const params = new HttpParams()
      .set('name', name);

    return this.http.post('/api/admin/server', params)
      .toPromise();
  }

  public updateServer(serverId: string, name: string, endpoint: string, announce: string, dynmap?: string): Promise<object> {
    const params = new HttpParams()
      .set('name', name)
      .set('endpoint', endpoint)
      .set('announce', announce)
      .set('dynmap', dynmap);

    return this.http.put(`/api/role/skin${serverId}`, params)
      .toPromise();
  }
}
