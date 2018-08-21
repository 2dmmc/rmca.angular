import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {IServer} from '../../../@model/common/admin/server/server.interface';
import {IFinance} from '../../../@model/common/admin/server/finacne/finance.interface';

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

  public addServer(server: IServer): Promise<object> {
    const params = new HttpParams()
      .set('name', server.name)
      .set('endpoint', server.endpoint)
      .set('announce', server.announce)
      .set('dynmap', server.dynmap);

    return this.http.post('/api/admin/server', params)
      .toPromise();
  }

  public updateServer(server: IServer): Promise<object> {
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

  public addFinanceHistory(finance: IFinance): Promise<object> {
    const params = new HttpParams()
      .set('date', finance.date.toString())
      .set('type', finance.type.toString())
      .set('accrual', (finance.accrual * 100).toFixed(0))
      .set('comment', finance.comment)
      .set('userId', finance.user);

    return this.http.post('/api/admin/finance', params)
      .toPromise();
  }

  public updateFinanceHistory(comment: string, userId: string, financeId: number): Promise<object> {
    const params = new HttpParams()
      .set('comment', comment)
      .set('userId', userId);

    return this.http.patch(`/api/admin/finance/${financeId.toString()}`, params)
      .toPromise();
  }
}
