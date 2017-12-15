import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {UserService} from '../../pages/user/user.service';

@Injectable()
export class AuthUtilService {
  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  // TODO 补齐文档
  public isUserAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getLoginState()
        .then(user => {
          if (user) {
            resolve(user);
          } else {
            reject(user);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
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
