import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {IServer} from '../../@model/common/admin/fmc/server/server.interface';
import {IFinanceRequest} from '../../@model/common/admin/fmc/finacne/finance.interface';

@Injectable()
export class FmcService {
  constructor(private http: HttpClient) {
  }

  /**
   * @name 获取服务器列列表
   * @description 获取完整的服务器列表, 返回IServer构成的数组
   * @return {Promise<IServer[]>}
   */
  public getServers(): Promise<IServer[]> {
    return this.http.get<IServer[]>('/api/admin/server/list')
      .toPromise();
  }

  /**
   * @name 获取服务器详情
   * @description 获取服务器详情, 入参为要获取详情的服务器ID. 返回IServer
   * @param {string} serverId 服务器ID
   * @return {Promise<IServer>}
   */
  public getServer(serverId: string): Promise<IServer> {
    return this.http.get<IServer>(`/api/admin/server/${serverId}`)
      .toPromise();
  }

  /**
   * @name 新增服务器
   * @description 新增服务器, 入参为完整的IServer结构. 返回新增结果
   * @param {IServer} server
   * @return {Promise<object>}
   */
  public addServer(server: IServer): Promise<object> {
    const params = new HttpParams()
      .set('name', server.name)
      .set('endpoint', server.endpoint)
      .set('announce', server.announce)
      .set('dynmap', server.dynmap);

    return this.http.post('/api/admin/server', params)
      .toPromise();
  }

  /**
   * @name 更新服务器信息
   * @description 更新服务器信息, 入参为完整的IServer结构和ID. 返回更新结果
   * @param {string} id
   * @param {IServer} server
   * @return {Promise<object>}
   */
  public updateServer(id: string, server: IServer): Promise<object> {
    const params = new HttpParams()
      .set('name', server.name)
      .set('endpoint', server.endpoint)
      .set('announce', server.announce)
      .set('dynmap', server.dynmap);

    return this.http.put(`/api/admin/server/${id}`, params)
      .toPromise();
  }

  /**
   * @name 删除服务器
   * @description 删除服务器, 入参为要删除的服务器ID. 返回删除结果
   * @param {string} serverId
   * @return {Promise<object>}
   */
  public deleteServer(serverId: string): Promise<object> {
    return this.http.delete(`/api/admin/server/${serverId}`)
      .toPromise();
  }

  // TODO 补齐文档
  public addFinanceHistory(finance: IFinanceRequest): Promise<object> {
    const params = new HttpParams()
      .set('date', finance.date.toString())
      .set('type', finance.type.toString())
      .set('accrual', (finance.accrual * 100).toFixed(0))
      .set('comment', finance.comment)
      .set('userId', finance.userId);

    return this.http.post('/api/admin/finance', params)
      .toPromise();
  }

  public updateFinanceHistory(id: string, finance: IFinanceRequest): Promise<object> {
    const params = new HttpParams()
      .set('comment', finance.comment)
      .set('userId', finance.userId);

    return this.http.patch(`/api/admin/finance/${id}`, params)
      .toPromise();
  }
}
