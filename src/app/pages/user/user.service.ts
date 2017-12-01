import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  /**
   * @name 获取用户个人资料
   * @description 获取当前用户的个人资料. 返回不完整的User模型.
   * @return {Promise<Object>}
   */
  getUserProfile(): Promise<object> {
    return this.http.get('/api/user/profile')
      .toPromise();
  }

  /**
   * @name 更新用户个人资料
   * @description 更新当前用户的个人资料. 入参为要更新资料的字段. 返回更新结果.
   * @param {string} email 电子邮箱
   * @return {Promise<Object>}
   */
  updateUserProfile(email: string): Promise<object> {
    const params = new HttpParams()
      .set('email', email);

    return this.http.post('/api/user/profile', params)
      .toPromise();
  }

  /**
   * @name 更新用户密码
   * @description 更新当前用户的密码. 入参为当前用户的当前密码和新密码. 返回更新结果.
   * @param {string} password 当前密码
   * @param {string} newPassword 新密码
   * @return {Promise<Object>}
   */
  updateUserPassword(password: string, newPassword: string): Promise<object> {
    const params = new HttpParams()
      .set('password', password)
      .set('newPassword', newPassword);

    return this.http.post('/api/user/password', params)
      .toPromise();
  }

  /**
   * @name 更新正版验证资料
   * @description 更新当前用户的Minecraft正版验证资料. 入参为Mojang用户名和密码. 返回更新结果.
   * @param {string} username Mojang用户名
   * @param {string} password Mojang密码
   * @return {Promise<Object>}
   */
  updateUserYggdrasil(username: string, password: string): Promise<object> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('/api/user/yggdrasil', params)
      .toPromise();
  }

  /**
   * @name 验证电子邮箱
   * @description 验证当前用户电子邮箱是否有效. 入参为附在URL中的Hash. 返回验证结果.
   * @param {string} hash URL中的hash
   * @return {Promise<Object>}
   */
  verifyEmail(hash: string): Promise<object> {
    return this.http.patch(`/api/user/email-verify/${hash}`, {})
      .toPromise();
  }

  /**
   * @name 重新发送验证邮件
   * @description 重新发送"验证用户电子邮箱是否有效"的电子邮件. 返回发送结果.
   * @return {Promise<Object>}
   */
  resendVerifyEmail(): Promise<object> {
    return this.http.get('/api/user/resend-verify-email')
      .toPromise();
  }

  updateUserAvatar(socialType: string): Promise<object> {
    return this.http.post(`/api/social/avatar/${socialType}`, {})
      .toPromise();
  }
}
