import {Injectable} from '@angular/core';

import {IUser} from '../../@model/common/user/user.interface';

@Injectable()
export class AuthUtilService {
  private _user: IUser;

  constructor() {
  }

  public get user(): IUser {
    return this._user;
  }

  public set user(user: IUser) {
    this._user = user;
  }

  // public async isUserAuthenticated(): Promise<LoginStateResult> {
  //   const loginStateResult = new LoginStateResult();
  //
  //   try {
  //     loginStateResult.isLogin = true;
  //     loginStateResult.user = await this.authService.getLoginState() as ILoginStateResultUser;
  //
  //     return loginStateResult;
  //   } catch (error) {
  //     loginStateResult.isLogin = false;
  //     loginStateResult.user = null;
  //     loginStateResult.error = error;
  //
  //     return loginStateResult;
  //   }
  // }

  public isAdmin(): boolean {
    return this._user.admin;
  }

  public isDeveloper(): boolean {
    return true;
    // return this.userCacheService.getCache().username === 'sdjnmxd' ||
    // this.userCacheService.getCache().username === 'bangbang93';
  }
}
