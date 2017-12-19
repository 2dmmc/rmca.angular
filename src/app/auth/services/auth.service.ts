import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  /**
   * @name 登陆
   * @description 登陆. 入参为用户名, 密码, 是否保持登陆状态. 返回登陆结果.
   * @param username 用户名
   * @param password 密码
   * @param isKeepLogin 是否保持登陆状态
   * @return {Promise<Object>}
   */
  public login(username, password, isKeepLogin): Promise<object> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('isKeepLogin', isKeepLogin);

    return this.http.post('/api/user/login', params)
      .toPromise();
  }

  /**
   * @name 登出
   * @description 字面意思. 返回登出结果.
   * @return {Promise<Object>}
   */
  public logout(): Promise<object> {
    return this.http.get('/api/user/logout')
      .toPromise();
  }

  /**
   * @name 注册
   * @description 注册, 注册成为炉心用户. 入参为用户名, 密码, 电子邮箱. 返回注册结果.
   * @param username 用户名
   * @param password 密码
   * @param email 电子邮箱
   * @return {Promise<Object>}
   */
  public register(username, password, email): Promise<object> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email);

    return this.http.post('/api/user/register', params)
      .toPromise();
  }

  /**
   * @name 请求重置密码
   * @description 请求重置密码, 往用户邮箱里发一封包含密码重置链接的邮件. 入参为用户的电子邮箱. 返回发送结果.
   * @param email 用户的电子邮箱
   * @return {Promise<Object>}
   */
  public requestResetPassword(email): Promise<object> {
    const params = new HttpParams()
      .set('email', email);

    return this.http.post('/api/user/reset', params)
      .toPromise();
  }

  /**
   * @name 重置密码
   * @description 通过hash重置用户密码. 入参为URL中的hash和用户填写的密码. 返回重置结果.
   * @param hash URL中的hash
   * @param password 用户填写的密码
   * @return {Promise<Object>}
   */
  public resetPassword(hash, password): Promise<object> {
    const params = new HttpParams()
      .set('password', password);

    return this.http.post(`/api/user/reset/${hash}`, params)
      .toPromise();
  }

  /**
   * @name 检查重置密码hash有效性
   * @description 检测用户通过URL携带过来的重置密码Hash是否有效. 入参为待检测的Hash. 返回检测结果.
   * @param hash URL中的hash
   * @return {Promise<Object>}
   */
  public checkResetPasswordHash(hash): Promise<object> {
    return this.http.get(`/api/user/reset/${hash}`)
      .toPromise();
  }

  /**
   * @name 获取登陆状态
   * @description 获取当前用户的登陆状态. SAP的核心鉴权方法. 返回不完整的User模型或未登录.
   * @return {Promise<Object>}
   */
  public async getLoginState(): Promise<object> {
    return this.http.get('/api/user/login')
      .toPromise();
  }

  public logoutImpersonate(): Promise<object> {
    return this.http.delete('/api/admin/user/impersonate')
      .toPromise();
  }
}
