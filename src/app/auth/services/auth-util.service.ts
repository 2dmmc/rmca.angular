import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {LoginStateResult} from '../../@model/auth/login-state-result.class';
import {LoginStateResultUser} from '../../@model/auth/login-state-result-user.interface';

import {UserCacheService} from '../../@system/cache/service/user-cache.service';

@Injectable()
export class AuthUtilService {
  constructor(private authService: AuthService,
              private userCacheService: UserCacheService) {
  }

  public async isUserAuthenticated(): Promise<LoginStateResult> {
    const loginStateResult = new LoginStateResult();

    try {
      loginStateResult.isLogin = true;
      loginStateResult.user = await this.authService.getLoginState() as LoginStateResultUser;

      return loginStateResult;
    } catch (error) {
      loginStateResult.isLogin = false;
      loginStateResult.user = null;
      loginStateResult.error = error;

      return loginStateResult;
    }
  }

  public isAdmin(): boolean {
    return this.userCacheService.getCache().admin;
  }

  public isDeveloper(): boolean {
    return this.userCacheService.getCache().username === 'sdjnmxd' || this.userCacheService.getCache().username === 'bangbang93';
  }
}
