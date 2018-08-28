import {Injectable} from '@angular/core';

import {AuthService} from '../data/auth.service';
import {UserService} from '../data/user.service';

import {IUser, IUserExtend, UserState} from '../../@model/common/user/user.interface';
import {ILoginState} from '../../@model/response/auth/login-state.interface';

@Injectable()
export class AuthUtilService {
  private _user: IUserExtend;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  public get user(): IUserExtend {
    return this._user;
  }

  public set user(user: IUserExtend) {
    this._user = AuthUtilService.extendUserModel(user);
  }

  public async updateUser(): Promise<IUserExtend> {
    const user = await this.userService.getUserProfile();
    this._user = AuthUtilService.extendUserModel(user);
    return this._user;
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

  private static extendUserModel(user: IUser): IUserExtend {
    const extendUser = user as IUserExtend;

    if (extendUser.ban) {
      extendUser.state = UserState.BANNED;
    } else if (!extendUser.isEmailVerify) {
      extendUser.state = UserState.NEED_EMAIL_VALIDATION;
    } else {
      extendUser.state = UserState.NORMAL;
    }

    return extendUser;
  }
}
