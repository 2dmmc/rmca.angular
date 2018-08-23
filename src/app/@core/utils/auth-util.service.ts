import {Injectable} from '@angular/core';

import {AuthService} from '../data/auth.service';
import {IUser} from '../../@model/common/user/user.interface';
import {ILoginState} from '../../@model/response/auth/login-state.interface';

@Injectable()
export class AuthUtilService {
  private _user: IUser;

  constructor(private authService: AuthService) {
  }

  public get user(): IUser {
    return this._user;
  }

  public set user(user: IUser) {
    this._user = user;
  }

  public async isUserAuthenticated(): Promise<ILoginState> {
     return await this.authService.getLoginState();
  }

  public isAdmin(): boolean {
    return this._user.admin;
  }

  public isDeveloper(): boolean {
    return this._user.username === 'sdjnmxd' || this._user.username === 'bangbang93';
  }
}
