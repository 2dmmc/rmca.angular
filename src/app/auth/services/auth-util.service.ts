import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {LoginStateResult} from '../../@model/auth/login-state-result.class';
import {ILoginStateResultUser} from '../../@model/auth/login-state-result-user.interface';

@Injectable()
export class AuthUtilService {
  constructor(private authService: AuthService) {
  }

  public async isUserAuthenticated(): Promise<LoginStateResult> {
    const loginStateResult = new LoginStateResult();

    try {
      loginStateResult.isLogin = true;
      loginStateResult.user = await this.authService.getLoginState() as ILoginStateResultUser;

      return loginStateResult;
    } catch (error) {
      loginStateResult.isLogin = false;
      loginStateResult.user = null;
      loginStateResult.error = error;

      return loginStateResult;
    }
  }

  public isAdmin(): boolean {
    return false;
    // return this.userCacheService.getCache().admin;
  }

  // public isDeveloper(): boolean {
  //   return false;
  //   return this.userCacheService.getCache().username === 'sdjnmxd' ||
  // this.userCacheService.getCache().username === 'bangbang93';
  // }
}
