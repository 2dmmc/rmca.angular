import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {IUser} from '../../@model/common/user/user.interface';
import {ILoginState} from '../../@model/response/auth/login-state.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  /**
   * @name 登录
   * @description 登录. 入参为用户名, 密码, 是否保持登录状态. 返回登录结果.
   *
   * @param {string} username 用户名
   * @param {string} password 密码
   * @param {boolean} isKeepLogin 是否需要保持登录状态
   * @return {Promise<IUser>} 返回一个完整的用户
   */
  public login(username: string, password: string, isKeepLogin: boolean): Promise<IUser> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('isKeepLogin', isKeepLogin.toString());

    return this.http.post<IUser>('/api/user/login', params)
      .toPromise();
  }

  /**
   * @name 登出
   * @description 字面意思. 返回登出结果.
   * @return {Promise<void>}
   */
  public logout(): Promise<void> {
    return this.http.get<void>('/api/user/logout')
      .toPromise();
  }

  /**
   * @name 注册
   * @description 注册, 注册成为炉心用户. 入参为用户名, 密码, 电子邮箱. 返回注册结果.
   * @param username 用户名
   * @param password 密码
   * @param email 电子邮箱
   * @return {Promise<void>}
   */
  public register(username: string, email: string, password: string): Promise<void> {
    const params = new HttpParams()
      .set('username', username)
      .set('email', email)
      .set('password', password);

    return this.http.post<void>('/api/user/register', params)
      .toPromise();
  }

  /**
   * @name 请求重置密码
   * @description 请求重置密码, 往用户邮箱里发一封包含密码重置链接的邮件. 入参为用户的电子邮箱. 返回发送结果.
   * @param email 用户的电子邮箱
   * @return {Promise<void>}
   */
  public requestResetPassword(email: string): Promise<void> {
    const params = new HttpParams()
      .set('email', email);

    return this.http.post<void>('/api/user/reset', params)
      .toPromise();
  }

  /**
   * @name 重置密码
   * @description 通过hash重置用户密码. 入参为URL中的hash和用户填写的密码. 返回重置结果.
   * @param hash URL中的hash
   * @param password 用户填写的密码
   * @return {Promise<void>}
   */
  public resetPassword(hash: string, password: string): Promise<void> {
    const params = new HttpParams()
      .set('password', password);

    return this.http.post<void>(`/api/user/reset/${hash}`, params)
      .toPromise();
  }

  /**
   * @name 检查重置密码hash有效性
   * @description 检测用户通过URL携带过来的重置密码Hash是否有效. 入参为待检测的Hash. 返回检测结果.
   * @param hash URL中的hash
   * @return {Promise<void>}
   */
  public checkResetPasswordHash(hash): Promise<void> {
    return this.http.get<void>(`/api/user/reset/${hash}`)
      .toPromise();
  }

  /**
   * @name 获取登录状态
   * @description 获取当前用户的登录状态. SAP的核心鉴权方法. 返回不完整的User模型或未登录.
   * @return {Promise<ILoginState>}
   */
  public async getLoginState(): Promise<ILoginState> {
    return this.http.get<ILoginState>('/api/user/login')
      .toPromise();
  }

  /**
   * @name 退出替身登录
   * @description RT
   * @return {Promise<void>}
   */
  public logoutImpersonate(): Promise<void> {
    return this.http.delete<void>('/api/admin/user/impersonate')
      .toPromise();
  }
}
