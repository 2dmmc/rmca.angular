import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Server} from '../../../@model/admin/server/server.interface';
import {Finance} from '../../../@model/admin/server/finance.interface';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {
  }

  // TODO 补齐文档

  public getServers(): Promise<object> {
    return this.http.get('/api/admin/server/list')
      .toPromise();
  }

  public getServer(serverId: string): Promise<object> {
    return this.http.get(`/api/admin/server/${serverId}`)
      .toPromise();
  }

  public addServer(server: Server): Promise<object> {
    const params = new HttpParams()
      .set('name', server.name)
      .set('endpoint', server.endpoint)
      .set('announce', server.announce)
      .set('dynmap', server.dynmap);

    return this.http.post('/api/admin/server', params)
      .toPromise();
  }

  public updateServer(server: Server): Promise<object> {
    const params = new HttpParams()
      .set('name', server.name)
      .set('endpoint', server.endpoint)
      .set('announce', server.announce)
      .set('dynmap', server.dynmap);

    return this.http.put(`/api/admin/server/${server._id}`, params)
      .toPromise();
  }

  public deleteServer(serverId: string): Promise<object> {
    return this.http.delete(`/api/admin/server/${serverId}`)
      .toPromise();
  }

  public addFinance(finance: Finance): Promise<object> {
    const params = new HttpParams()
      .set('date', finance.date.toString())
      .set('type', finance.type)
      .set('accrual', (finance.accrual * 100).toString())
      .set('comment', finance.comment);

    return this.http.post('/api/admin/finance', params)
      .toPromise();
  }
}
