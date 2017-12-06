import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {
  constructor(private http: HttpClient) {
  }

  /**
   * @name 获取角色列表
   * @description 获取当前用户的角色列表. 返回包含若干不完整Role模型的集合.
   * @return {Promise<Object>}
   */
  public getRoles(): Promise<object> {
    return this.http.get('/api/role')
      .toPromise();
  }

  /**
   * @name 获取角色详情
   * @description 获取某个角色的详情. 入参为待获取详情的角色ID. 返回不完整Role模型.
   * @param {string} roleId 角色ID
   * @return {Promise<Object>}
   */
  public getRole(roleId: string): Promise<object> {
    return this.http.get(`/api/role/${roleId}`)
      .toPromise();
  }

  /**
   * @name 新增角色
   * @description 新增角色. 入参为角色名称. 返回新增结果.
   * @param {string} rolename 角色名称
   * @return {Promise<Object>}
   */
  public addRole(rolename: string): Promise<object> {
    const params = new HttpParams()
      .set('rolename', rolename);

    return this.http.post('/api/role', params)
      .toPromise();
  }

  /**
   * @name 更新角色详情
   * @description 更新某个角色的详情信息. 入参为要更新的字段. 返回更新结果.
   * @param {string} roleId 角色id
   * @param {string} skinModel 皮肤模型
   * @param {string} skin 皮肤
   * @return {Promise<Object>}
   */
  public updateRole(roleId: string, skinModel: string, skin: string): Promise<object> {
    // FIXME https://github.com/angular/angular/issues/18261
    // FUCK u Angular
    // const params = new HttpParams()
    //   .set('model', skinModel)
    //   .set('skin', skin);

    return this.http.post(`/api/role/skin/${roleId}`, {
      model: skinModel,
      skin: skin,
    })
      .toPromise();
  }

  /**
   * @name 同步正版验证皮肤
   * @description 从Mojang服务器同步皮肤至某个角色. 入参为角色ID. 返回同步结果.
   * @param {string} roldId 角色ID
   * @return {Promise<Object>}
   */
  public updateYggdrasilSkin(roldId: string): Promise<object> {
    return this.http.patch(`/api/role/skin/${roldId}/yggdrasil`, {})
      .toPromise();
  }

  /**
   * @name 更新默认角色
   * @description 更新某个角色为默认角色. 入参为角色ID. 返回更新结果.
   * @param {string} roleId 角色ID
   * @return {Promise<Object>}
   */
  public updateDefaultRole(roleId: string): Promise<object> {
    const params = new HttpParams()
      .set('roleId', roleId);

    return this.http.patch('/api/role/default', params)
      .toPromise();
  }
}
