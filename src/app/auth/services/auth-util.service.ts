import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {LoginStateResult} from '../../@model/loginStateResult';
import {LoginStateResultUser} from '../../@model/user/auth/login-state-result.interface';

import {UserCacheService} from '../../@system/cache/service/user-cache.service';

@Injectable()
export class AuthUtilService {
  constructor(private authService: AuthService,
              private userCacheService: UserCacheService) {
  }

  public async isUserAuthenticated(): Promise<LoginStateResult> {
    try {
      const loginState = await this.authService.getLoginState();
      const loginStateResult = new LoginStateResult();

      if (loginState) {
        loginStateResult.isLogin = true;
        loginStateResult.user = loginState as LoginStateResultUser;
        return loginStateResult;
      } else {
        loginStateResult.isLogin = false;
        loginStateResult.user = null;
        return loginStateResult;
      }
    } catch (error) {
      console.trace(error);
    }
  }

  public isAdmin(): boolean {
    return this.userCacheService.getCache().admin;
  }

  public isDeveloper(): boolean {
    return this.userCacheService.getCache().username === 'sdjnmxd' || this.userCacheService.getCache().username === 'bangbang93';
  }
}
