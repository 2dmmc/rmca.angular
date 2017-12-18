import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {UserService} from '../../pages/user/user.service';
import {LoginStateResult} from '../../@model/loginStateResult';
import {LoginStateResultUser} from '../../@model/user/auth/login-state-result.interface';

@Injectable()
export class AuthUtilService {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  // TODO 补齐文档
  public async isUserAuthenticated(): Promise<LoginStateResult> {
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
  }

  public isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        this.userService.getUserProfile()
          .then(user => {
            if (user['admin']) {
              resolve(true);
            } else {
              reject(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      },
    );
  }

  public isDeveloper(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getUserProfile()
        .then(user => {
          if (user['username'] === 'sdjnmxd' || user['username'] === 'bangbang93') {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
}
